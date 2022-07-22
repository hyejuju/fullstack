describe('Blog app', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
      })

    it('page can be opened', function() {
      cy.contains('blogs')
    })

    it('login form is shown', function() {
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    it('user can login', function() {
        cy.get('#username').type('username')
        cy.get('#password').type('password')
        cy.get('#login-button').click()
        cy.contains('logged in')
    })
    
    it('user fails to login with invalid credentials', function() {
        cy.get('#username').type('asdf')
        cy.get('#password').type('asdf')
        cy.get('#login-button').click()
        cy.contains('Wrong credentials')
    })


    describe('when logged in', function() {
        beforeEach(function() {
          cy.get('#username').type('username')
          cy.get('#password').type('password')
          cy.get('#login-button').click()
        })

        it('a new blog can be created', function() {
          cy.contains('new blog').click()
          cy.get('#title').type('new title')
          cy.get('#author').type('new author')
          cy.get('#url').type('new url')
          cy.get('#likes').type('123')
          cy.contains('Create').click()
          cy.contains('new title')
          cy.contains('new author')
        })

        it('user can like a blog', function() {
            cy.contains('view').click()
            cy.get('#like-button').click() 
            cy.contains('124')
        })

        it('user can delete a blog', function() {
            cy.contains('view').click()
            cy.get('#remove-button').click() 
            cy.wait(1500)
            cy.contains(' Removed blog')
        })

        it('blogs are listed according to likes', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('The title with the most likes')
            cy.get('#author').type('1 author')
            cy.get('#url').type('1 url')
            cy.get('#likes').type('123')
            cy.contains('Create').click()

          cy.contains('new blog').click()
          cy.get('#title').type('The title with the second most likes')
          cy.get('#author').type('2 author')
          cy.get('#url').type('2 url')
          cy.get('#likes').type('122')
          cy.contains('Create').click()

          cy.wait(500)
          
          cy.get('.blogShort').eq(0).should('contain', 'The title with the most likes')
          cy.get('.blogShort').eq(1).should('contain', 'The title with the second most likes')
        })
    })
  })