context('Automation Exercise API Tests: productsList', () => {
    it('should fetch products list and verify response structure', () => {
      cy.request('https://automationexercise.com/api/productsList')
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('responseCode', 200)
          expect(response.body).to.have.property('products').and.to.be.an('array')
        })
    })
  
    it('should verify product details in the response', () => {
      cy.request('https://automationexercise.com/api/productsList')
        .its('body.products')
        .then((products) => {
          // Verify first product structure
          expect(products[0]).to.include.keys('id', 'name', 'price', 'brand', 'category')
          expect(products[0].category).to.have.property('usertype')
          expect(products[0].category).to.have.property('category')
        })
    })
  
    it('should filter and verify women products', () => {
      cy.request('https://automationexercise.com/api/productsList')
        .its('body.products')
        .then((products) => {
          const womenProducts = products.filter(
            product => product.category.usertype.usertype === 'Women'
          )
          expect(womenProducts).to.not.be.empty
          womenProducts.forEach(product => {
            expect(product.category.usertype.usertype).to.equal('Women')
          })
        })
    })
  
    it('should verify specific brands exist', () => {
      cy.request('https://automationexercise.com/api/productsList')
        .its('body.products')
        .then((products) => {
          const brands = products.map(product => product.brand)
          expect(brands).to.include.members(['H&M', 'Polo', 'Madame'])
        })
    })
  
    it('should verify price format for all products', () => {
      cy.request('https://automationexercise.com/api/productsList')
        .its('body.products')
        .then((products) => {
          products.forEach(product => {
            expect(product.price).to.match(/^Rs\. \d+$/)
          })
        })
    })
  })
  
  context('Automation Exercise API Tests: brandsList', () => {
    it('should fetch brands list and verify response structure', () => {
      cy.request('https://automationexercise.com/api/brandsList')
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('responseCode', 200)
          expect(response.body).to.have.property('brands').and.to.be.an('array')
        })
    })
  
    it('should verify brand object structure', () => {
      cy.request('https://automationexercise.com/api/brandsList')
        .its('body.brands')
        .then((brands) => {
          expect(brands[0]).to.include.keys('id', 'brand')
          expect(brands[0].id).to.be.a('number')
          expect(brands[0].brand).to.be.a('string')
        })
    })
  
    it('should verify presence of specific brands', () => {
      cy.request('https://automationexercise.com/api/brandsList')
        .its('body.brands')
        .then((brands) => {
          const uniqueBrands = [...new Set(brands.map(b => b.brand))]
          expect(uniqueBrands).to.include.members([
            'Polo',
            'H&M',
            'Madame',
            'Mast & Harbour',
            'Babyhug',
            'Allen Solly Junior',
            'Kookie Kids',
            'Biba'
          ])
        })
    })
  
    it('should reject POST request with 405 Method Not Allowed', () => {
      cy.request({
        method: 'POST',
        url: 'https://automationexercise.com/api/brandsList',
        failOnStatusCode: false
      }).should((response) => {
        expect(response.status).to.eq(405)
        expect(response.body).to.have.property('message', 'This request method is not supported')
      })
    })
  })
  
  