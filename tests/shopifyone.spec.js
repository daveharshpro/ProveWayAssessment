import {test, expect} from '@playwright/test'

let page;
let context;

test.beforeAll(async({browser}) =>{

  context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  })
  page= await context.newPage()
  await page.goto(`${process.env.SHOPIFY_LOGIN_URL}`)
  await page.click('a:has-text("Log in")')
  await page.fill('#account_email', `${process.env.SHOPIFY_LOGIN_EMAIL}`)
  await page.locator('.login-button').click()
  await page.fill('#account_password', `${process.env.SHOPIFY_LOGIN_PASSWORD}`)
  await page.click('button:has-text("Log in")')
  await page.waitForURL(`${process.env.SHOPIFY_BASE_URL}${process.env.STORE_NAME}?**`)
})

test.afterAll(async({browser}) =>{

  await page.goto(`${process.env.SHOPIFY_BASE_URL}${process.env.STORE_NAME}`)
  await page.locator(`div.Polaris-Box:has-text("${process.env.STORE_NAME}")`).click()
  await page.locator('button:has-text("Log out")').click()

  await page.close()

})

test.describe('Pumper Quantity Breaks Automation', async () =>{

test('Create Quantity Breaks Offer', async () =>{

  await page.goto(`${process.env.SHOPIFY_BASE_URL}${process.env.STORE_NAME}/apps/discount-app-staging-3`)

  const frame = page.frameLocator('iframe[title="Pumper Bundles Quantity Breaks"]')
  await frame.locator('button:has-text("Create new offer")').click()

  await page.waitForURL(`${process.env.SHOPIFY_BASE_URL}${process.env.STORE_NAME}/apps/discount-app-staging-3/createoffer`)
  await page.waitForLoadState('networkidle')

  await frame.locator('button:has-text("Create a Quantity Break")').click()

  await page.waitForURL(`${process.env.SHOPIFY_BASE_URL}${process.env.STORE_NAME}/apps/discount-app-staging-3/offerbundle`)
  
  await frame.locator('#offerName').fill(`offer${new Date().toISOString().replace(/[-:T]/g, '').slice(0,10)}`)

  const ProductRadioLable = frame.locator('label:has-text("Product")').nth(1);
  await ProductRadioLable.click()
  await frame.locator('button:has-text("Select a Product")').click()
  await expect(await page.locator('.Polaris-Modal-Dialog__Modal')).toBeVisible()
  await page.waitForLoadState('networkidle')

  const totalProducts = await (await page.locator('.Polaris-Modal-Dialog__Modal ul li')).count()
  await expect(totalProducts).toBe(3)

  await page.locator('.Polaris-Modal-Dialog__Modal ul li').nth(2).click()
  await page.locator('.Polaris-Modal-Dialog__Modal button:has-text("Add")').click()
  await page.waitForLoadState('networkidle')

  await frame.locator('button:has-text("Apply selected template")').click()

  await expect(await frame.locator('.tab-list li').count()).toBe(3)
  await frame.locator('.tab-list li').nth(1).click()
  await expect(await frame.locator('#discount1')).toHaveValue('10')

  await frame.locator('button:has-text("Publish")').click()
  await expect(await frame.locator('.Polaris-Badge:has-text("Published")')).toBeVisible()


})

test('Verify Discount on Storefront', async () =>{

  await page.goto(process.env.STORE_BASE_URL)
  await page.locator('#password').fill(process.env.STORE_PASSWORD)
  await page.locator('button:has-text("Enter")').click()

  await page.locator('.product-card-wrapper').click()

  await page.waitForURL(`${process.env.STORE_BASE_URL}products/example-t-shirt`)

  await page.locator('button:has-text("Add to cart")').click()
  await page.locator('a:has-text("View cart")').click()

  const originalPriceText = await page.locator('.cart-item__totals dl.cart-item__discounted-prices s').first().innerText()
  const discountedPriceText = await page.locator('.cart-item__totals dl.cart-item__discounted-prices dd.price').first().innerText()
  
  console.log(originalPriceText)
  console.log(discountedPriceText)

  const originalPrice = parseFloat(originalPriceText.replace('Rs.','').trim().replace(' ',''))
  const discountedPrice = parseFloat(discountedPriceText.replace('Rs.','').trim().replace(' ',''))

  const expectedPrice = originalPrice - (originalPrice * 0.10)

  //discount rpice shou;d be 10% of oroginal price
  expect(discountedPrice).toBe(expectedPrice)

  const totalPriceText = await page.locator('p.totals__total-value').innerText()
  const totalPrice = parseFloat(totalPriceText.replace('Rs.','').trim().replace(' ',''))

  //Amount to be paid is equal to discounted price
  expect(totalPrice).toBe(discountedPrice)


})

})
