import urllib.request
from playwright.async_api import async_playwright

SPACE_URL = "https://parth2005147-pollinations-image-generator.hf.space"

async def generate_poster_image(prompt, output_path):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        await page.goto(SPACE_URL, wait_until="domcontentloaded")
        await page.wait_for_selector("textarea", timeout=30000)
        await page.fill("textarea", prompt)
        await page.click("button:has-text('Submit'), button:has-text('Generate')")

        link_element = await page.wait_for_selector("a[href$='.png'], a[href$='.jpg'], a[href$='.jpeg']", timeout=120000)
        img_url = await link_element.get_attribute("href")

        if not img_url.startswith("http"):
            img_url = SPACE_URL.rstrip("/") + "/" + img_url.lstrip("/")

        urllib.request.urlretrieve(img_url, output_path)
        await browser.close()