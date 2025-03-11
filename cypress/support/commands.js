// Note: Having test data pre-seeded in the database would be ideal for these tests,
// as it would provide consistent test data and avoid the overhead of user registration.
// However, since we are testing against a public demo site (automationexercise.com)
// without database access, we have to handle test data setup through the API,
// which is slower and more brittle. This is a common trade-off when testing
// third-party applications we don't control.
// Todo: make additional using API call for testdata
Cypress.Commands.add('registerTestUser', (user) => {
    let signupEmail = user.email
    let signupPassword = user.password

    cy.log(`Create (new) login for ${signupEmail} ("${signupPassword}")`)
    // Click Signup/Login button
    cy.contains('Signup / Login', { log: false }).click({ log: false })

    // Verify signup section is visible
    cy.contains('New User Signup!', { log: false }).should('be.visible', { log: false })

    // Enter registration details
    cy.get('[data-qa="signup-name"]', { log: false }).type(user.name, { log: false })
    cy.get('[data-qa="signup-email"]', { log: false }).type(signupEmail, { log: false })
    cy.get('[data-qa="signup-button"]', { log: false }).click({ log: false })

    // Verify and fill account info
    cy.contains('Enter Account Information', { log: false }).should('be.visible', { log: false })
    cy.get('#id_gender1', { log: false }).check({ log: false })
    cy.get('#password', { log: false }).type(signupPassword, { log: false })
    cy.get('#days', { log: false }).select('1', { log: false })
    cy.get('#months', { log: false }).select('January', { log: false })
    cy.get('#years', { log: false }).select('1990', { log: false })

    // Select checkboxes
    cy.get('#newsletter', { log: false }).check({ log: false })
    cy.get('#optin', { log: false }).check({ log: false })

    // Fill address info
    cy.get('#first_name', { log: false }).type(user.name.split(' ')[0], { log: false })
    cy.get('#last_name', { log: false }).type(user.name.split(' ')[1], { log: false })
    cy.get('#company', { log: false }).type(user.company.name, { log: false })
    cy.get('#address1', { log: false }).type(user.address.street, { log: false })
    cy.get('#address2', { log: false }).type(user.address.suite, { log: false })
    cy.get('#country', { log: false }).select('United States', { log: false })
    cy.get('#state', { log: false }).type(user.address.city, { log: false })
    cy.get('#city', { log: false }).type(user.address.city, { log: false })
    cy.get('#zipcode', { log: false }).type(user.address.zipcode, { log: false })
    cy.get('#mobile_number', { log: false }).type(user.phone, { log: false })

    // Create account
    cy.get('[data-qa="create-account"]', { log: false }).click({ log: false })
})

Cypress.Commands.add('registerUser', (user) => {
    let signupEmail = user.email
    let signupPassword = user.password

    cy.log(`Create (new) login for ${signupEmail} ("${signupPassword}")`)
    // Click Signup/Login button
    cy.contains('Signup / Login', { log: false }).click({ log: false })

    // Verify signup section is visible
    cy.contains('New User Signup!', { log: false }).should('be.visible', { log: false })

    // Enter registration details
    cy.get('[data-qa="signup-name"]', { log: false }).type(user.name, { log: false })
    cy.get('[data-qa="signup-email"]', { log: false }).type(signupEmail, { log: false })
    cy.get('[data-qa="signup-button"]', { log: false }).click({ log: false })

    // Verify and fill account info
    cy.contains('Enter Account Information', { log: false }).should('be.visible', { log: false })
    cy.get('#id_gender1', { log: false }).check({ log: false })
    cy.get('#password', { log: false }).type(signupPassword, { log: false })
    cy.get('#days', { log: false }).select('1', { log: false })
    cy.get('#months', { log: false }).select('January', { log: false })
    cy.get('#years', { log: false }).select('1990', { log: false })

    // Select checkboxes
    cy.get('#newsletter', { log: false }).check({ log: false })
    cy.get('#optin', { log: false }).check({ log: false })

    // Fill address info
    cy.get('#first_name', { log: false }).type(user.name.split(' ')[0], { log: false })
    cy.get('#last_name', { log: false }).type(user.name.split(' ')[1], { log: false })
    cy.get('#company', { log: false }).type(user.company.name, { log: false })
    cy.get('#address1', { log: false }).type(user.address.street, { log: false })
    cy.get('#address2', { log: false }).type(user.address.suite, { log: false })
    cy.get('#country', { log: false }).select('United States', { log: false })
    cy.get('#state', { log: false }).type(user.address.city, { log: false })
    cy.get('#city', { log: false }).type(user.address.city, { log: false })
    cy.get('#zipcode', { log: false }).type(user.address.zipcode, { log: false })
    cy.get('#mobile_number', { log: false }).type(user.phone, { log: false })

    // Create account
    cy.get('[data-qa="create-account"]', { log: false }).click({ log: false })
})

Cypress.Commands.add("logoutIfPossible", () => {
    //conditional logout (not cypressian, but usefull)
    cy.get('body', { log: false }).then(($body) => {
        if ($body.text().includes('Logout')) {
            cy.log("Logging out")
            cy.contains("Logout", { log: false }).click({ log: false });
        }
    })
})

Cypress.Commands.add('loginUser', (credentials) => {
    cy.log(`Login as credentials ${JSON.stringify(credentials)}`)

    let signupEmail = credentials.email
    let signupPassword = credentials.password

    cy.logoutIfPossible();

    cy.visit('http://automationexercise.com/', { log: false })

    cy.log(`Login as ${signupEmail} ("${signupPassword}")`)
    // Click Signup/Login button
    cy.contains('Signup / Login', { log: false }).click({ log: false })

    // Verify login section is visible
    cy.contains('Login to your account', { log: false }).should('be.visible', { log: false })

    // Enter correct credentials
    cy.get('[data-qa="login-email"]', { log: false }).type(signupEmail, { log: false })
    cy.get('[data-qa="login-password"]', { log: false }).type(signupPassword, { log: false })
    cy.get('[data-qa="login-button"]', { log: false }).click({ log: false })
})

Cypress.Commands.add('deleteCurrentAccount', () => {
    cy.log("Delete current account")
    cy.contains('Delete Account', { log: false }).click({ log: false })
    cy.contains('Account Deleted!', { log: false }).should('be.visible', { log: false })
    cy.contains('Continue', { log: false }).click({ log: false })
})

// Note: Having test data pre-seeded in the database would be ideal for these tests,
// as it would provide consistent test data and avoid the overhead of user registration.
// However, since we are testing against a public demo site (automationexercise.com)
// without database access, we have to handle test data setup through the API,
// which is slower and more brittle. This is a common trade-off when testing
// third-party applications we don't control.
Cypress.Commands.add('cleanupTestUser', (user) => {
    try {
        cy.request({
            method: 'DELETE',
            url: 'https://automationexercise.com/api/deleteAccount',
            qs: {
                email: user.email,   
                password: user.password           
            },
            failOnStatusCode: true
        })
    } catch (error) {
        cy.log(`Could not remove user ${user.email}`)
    }
})