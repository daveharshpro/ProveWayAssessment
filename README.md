# Playwright Automation for Pumper Shopify App

## Overview

**Disclaimer:** Due to time constraints and based on the requirements mentioned in the document, I have written scripts for two functional events. Additional validation tests and other functionalities could have been implemented with more time.

This project contains Playwright automation scripts to automate the **Quantity Breaks** functionality in the **Pumper** app for a Shopify store.

I have also recorded the entire assessment process, from creating the Shopify store to writing automation scripts. You can view the recording [here](https://drive.google.com/file/d/1avvT6opXmEAv8oBFiQsKBLhnFZOMoij2/view?usp=sharing).

The scripts cover:
- Logging into Shopify Admin.
- Navigating to the Pumper app.
- Creating a new **Quantity Breaks Offer**.
- Verifying the applied discount on the storefront.
- Logging out after execution.

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [Playwright](https://playwright.dev/)
- A Shopify store with the Pumper app installed

## Installation
Clone this repository and install dependencies:

```sh
git clone https://github.com/daveharshpro/ProveWayAssessment.git
cd ProveWayAssessment
npm install
```

## Environment Variables
Create a `.env` file in the root directory and configure it as follows:

```env
SHOPIFY_BASE_URL=https://admin.shopify.com/store/
SHOPIFY_LOGIN_URL=https://www.shopify.com/in/store-login
STORE_BASE_URL=https://qaassesment.myshopify.com/
STORE_NAME=qaassesment
SHOPIFY_LOGIN_EMAIL=hpd.gkbie2015@gmail.com
SHOPIFY_LOGIN_PASSWORD=Multidots1@
STORE_PASSWORD=uyugla
```

**Note:** Replace the values with your actual Shopify credentials.

## Running the Tests
To execute the automation scripts, run:

```sh
npx playwright test
```

or

```sh
npm test
```

## Test Scenarios
The automation suite includes the following test scenarios:

### 1. Shopify Admin Login
- Navigates to the Shopify login page.
- Logs in using the credentials from the `.env` file.
- Waits until redirected to the store dashboard.

### 2. Create Quantity Breaks Offer
- Navigates to the Pumper app.
- Clicks "Create new offer".
- Selects "Create a Quantity Break".
- Fills in offer details, selects a product, and applies a discount template.
- Publishes the offer and verifies its status.

### 3. Verify Discount on Storefront
- Navigates to the storefront.
- Unlocks the store using the password.
- Selects a product and adds it to the cart.
- Checks if the discount is correctly applied (10% off the original price).

### 4. Shopify Admin Logout
- Navigates to the admin dashboard.
- Logs out of Shopify.

## Expected Results
- The created **Quantity Breaks Offer** should be published successfully.
- The discount applied in the storefront should match the expected 10% off.
- The total price in the cart should be updated accordingly.

## Playwright Configuration
Modify `playwright.config.js` if needed to customize test settings such as timeout, browser type, or test retries.

## Troubleshooting
- If tests fail, ensure:
  - The credentials in the `.env` file are correct.
  - The Shopify store and Pumper app are correctly set up.
  - The product selection and pricing logic are correct.
  - Playwright is installed and up to date (`npx playwright install`).


