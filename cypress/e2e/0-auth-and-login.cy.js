import '../support/commands'
context('Testcases without account', function () {
    let user = {}
    beforeEach(function () {
        cy.visit('http://automationexercise.com')
        
        //todo: Should be replaced with something that loads after initial page load:
        cy.get('body').should('be.visible') 

        cy.fixture('users').as('usersData')
        cy.get('@usersData').then(usersData => {
            user = usersData[0];            
            //Cleanup BEFORE everything
            cy.cleanupTestUser(user);
            cy.visit('http://automationexercise.com', {log: false})
            cy.logoutIfPossible();
        })
    })

    it('Test Case 1: should successfully register a new user', function () {

        cy.registerUser(user);
        // Verify account created
        cy.contains('Account Created!').should('be.visible') //Selector based on text content is brittle: Replace by Id's or test identifier
        cy.get('[data-qa="continue-button"]').click()

        // Verify logged in
        cy.contains('Logout').should('be.visible')
    })    

    it('Test Case 3: Login User with incorrect email and password', function () {
        cy.loginUser({email: "incorrect@unknown.test", password: "1234"})
        cy.contains('Your email or password is incorrect!').should('be.visible') //Selector based on text content is brittle: Replace by Id's or test identifier
    })
})

context('Testcases with account', function () {
    let user = {}
    before(function () {
        cy.visit('http://automationexercise.com')
        cy.get('body').should('be.visible') ///Should be replaced with something that loads after initial page load

        cy.fixture('users').as('usersData')
        cy.get('@usersData').then(usersData => {
            user = usersData[0];            
            //Cleanup BEFORE everything
            cy.cleanupTestUser(user);

            cy.registerTestUser(user);
            cy.visit('http://automationexercise.com', {log: false})
            cy.logoutIfPossible();
        })
    })

    beforeEach(function () {
        cy.visit('http://automationexercise.com')
        cy.get('body').should('be.visible') ///Should be replaced with something that loads after initial page load
        cy.logoutIfPossible();
        cy.visit('http://automationexercise.com', {log: false})
    })

    it('Test Case 2: should successfully login with correct credentials', function () {
        cy.loginUser(user)

        // Verify logged in as username
        cy.contains('Logged in as').should('be.visible')
    })

    it('Test Case 4: Logout User', function () {
        cy.log(`Log in as ${user.email}`)
        cy.loginUser(user);
        cy.contains('Logout').click(); //Selector based on text content is brittle: Replace by Id's or test identifier
        // Verify that user is navigated to login page
        cy.contains('Login to your account').should('be.visible') //Selector based on text content is brittle: Replace by Id's or test identifier
    })
    
    it('Test Case 5: Register User with existing email', function () {
        
        cy.log(`Retry create login for ${user.email}`)
        cy.contains('Signup / Login', { log: false }).click({ log: false }) //Selector based on text content is brittle: Replace by Id's or test identifier

        // Verify signup section is visible
        cy.contains('New User Signup!', { log: false }).should('be.visible', { log: false }) //Selector based on text content is brittle: Replace by Id's or test identifier

        // Enter registration details
        cy.get('[data-qa="signup-name"]', { log: false }).type(user.name, { log: false })
        cy.get('[data-qa="signup-email"]', { log: false }).type(user.email, { log: false })
        cy.get('[data-qa="signup-button"]').click()

        cy.contains('Email Address already exist!').should('be.visible') //Selector based on text content is brittle: Replace by Id's or test identifier
    })
})