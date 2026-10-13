"""Build a verified Shopify ZIP directly from the canonical theme, without copies.

Usage: python3 scripts/prepare-release.py output/elma-vada-release-2026-10-08.zip [--replace]
Only the seven Shopify theme directories are included. Replacement is explicit/atomic.
"""
import hashlib
import json
import re
import sys
import tempfile
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

ROOT = Path(__file__).resolve().parent.parent
DIRECTORIES = {"assets", "config", "layout", "locales", "sections", "snippets", "templates"}


def image_references(value, setting="", found=None):
    if found is None:
        found = {}
    if isinstance(value, str) and value.startswith("shopify://shop_images/"):
        found[setting] = value
    elif isinstance(value, dict):
        for key, item in value.items():
            image_references(item, setting + "/" + key, found)
    elif isinstance(value, list):
        for key, item in enumerate(value):
            image_references(item, setting + "/" + str(key), found)
    return found


def main():
    if len(sys.argv) not in (2, 3) or (len(sys.argv) == 3 and sys.argv[2] != "--replace"):
        raise ValueError("Provide an output ZIP path")
    output = (ROOT / sys.argv[1]).resolve()
    if output.parent != ROOT / "output" or output.suffix != ".zip":
        raise ValueError("Output must be a ZIP directly in output/")
    if output.exists() and len(sys.argv) != 3:
        raise FileExistsError("Refusing to overwrite an existing archive")
    if output.is_symlink():
        raise ValueError("Output must not be a symlink")
    files = {}
    schemas = {}
    for directory in sorted(DIRECTORIES):
        for source in sorted((ROOT / directory).rglob("*")):
            if source.is_symlink():
                raise ValueError(f"Unexpected symlink: {source}")
            if not source.is_file():
                continue
            name = source.relative_to(ROOT).as_posix()
            data = source.read_bytes()
            files[name] = data
            if source.suffix == ".json":
                json.loads(data)
            if directory == "sections" and source.suffix == ".liquid":
                match = re.search(r"{% schema %}([\s\S]*?){% endschema %}", data.decode())
                if not match:
                    raise ValueError(f"Missing section schema: {name}")
                schemas[source.stem] = json.loads(match[1])
    for name, data in files.items():
        if name.startswith("templates/") and name.endswith(".json"):
            template = json.loads(data)
            if len(set(template["order"])) != len(template["order"]):
                raise ValueError(f"Duplicate section order: {name}")
            for section_id, section in template["sections"].items():
                if section["type"] not in schemas:
                    raise ValueError(f"Missing section: {name}/{section_id}")
                spec = schemas[section["type"]]
                defs = {setting["id"]: setting for setting in spec.get("settings", []) if "id" in setting}
                unknown = set(section.get("settings", {})) - set(defs)
                if unknown:
                    raise ValueError(f"Unknown settings: {name}/{section_id}: {unknown}")
        if name.endswith(".liquid"):
            text = data.decode()
            for asset in re.findall(r"['\"]([^'\"]+)['\"]\s*\|\s*asset_url", text):
                if "assets/" + asset not in files:
                    raise ValueError(f"Missing local asset: {name}: {asset}")
            for snippet in re.findall(r"{%[-\s]*render\s+['\"]([^'\"]+)['\"]", text):
                if "snippets/" + snippet + ".liquid" not in files:
                    raise ValueError(f"Missing snippet: {name}: {snippet}")
    source_archive = ROOT / "theme_export__elmavada-com-elma-vada-24sep2026-media-update__06OCT2026-1117pm.zip"
    preserved_references = preserved_images = 0
    quote_form_preserved = False
    with ZipFile(source_archive) as original:
        for name in original.namelist():
            if name.startswith(("templates/", "config/")) and name.endswith(".json"):
                before = image_references(json.loads(original.read(name)))
                after = image_references(json.loads(files[name]))
                for key, value in before.items():
                    if after.get(key) != value:
                        raise ValueError(f"Changed image reference: {name}/{key}")
                    preserved_references += 1
                if name == "templates/page.quote.json":
                    before_form = json.loads(original.read(name))["sections"]["form"]
                    after_form = json.loads(files[name])["sections"]["form"]
                    if before_form != after_form:
                        raise ValueError("Quote app/form configuration changed")
                    quote_form_preserved = True
            if name.startswith("assets/") and Path(name).suffix.lower() in {".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".avif"}:
                if files.get(name) != original.read(name):
                    raise ValueError(f"Changed original image: {name}")
                preserved_images += 1
    output.parent.mkdir(exist_ok=True)
    with tempfile.NamedTemporaryFile(prefix=".elma-release-", suffix=".zip", dir=output.parent, delete=False) as staging_file:
        staging = Path(staging_file.name)
    try:
        with ZipFile(staging, "w", compression=ZIP_DEFLATED, compresslevel=9) as package:
            for name, data in files.items():
                package.writestr(name, data)
        with ZipFile(staging) as package:
            if package.testzip() is not None or set(package.namelist()) != set(files):
                raise ValueError("Archive integrity/file list verification failed")
            for name, data in files.items():
                if package.read(name) != data:
                    raise ValueError(f"Archive byte mismatch: {name}")
                if (ROOT / name).read_bytes() != data:
                    raise ValueError(f"Source changed during packaging: {name}")
        staging.replace(output)
    finally:
        staging.unlink(missing_ok=True)
    report = {
        "archive": output.relative_to(ROOT).as_posix(),
        "sha256": hashlib.sha256(output.read_bytes()).hexdigest(),
        "archiveBytes": output.stat().st_size,
        "fileCount": len(files),
        "directories": sorted(DIRECTORIES),
        "jsonTemplates": sum(name.startswith("templates/") and name.endswith(".json") for name in files),
        "imageReferencesPreserved": preserved_references,
        "originalLocalImagesPreserved": preserved_images,
        "quoteFormConfigurationPreserved": quote_form_preserved,
        "integrityAndSourceMatch": True,
        "published": False,
        "files": {name: hashlib.sha256(data).hexdigest() for name, data in files.items()},
    }
    # Generated build artifact, not a second working theme or backup directory.
    output.with_suffix(".manifest.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({key: value for key, value in report.items() if key != "files"}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
