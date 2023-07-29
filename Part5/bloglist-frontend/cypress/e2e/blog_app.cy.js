describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'admin',
      username: 'admin',
      password: 'password'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('admin')
      cy.get('#password').type('password')

      cy.contains('login').click()

      cy.contains('admin logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('admin')
      cy.get('#password').type('wrong')
      cy.contains('login').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'admin logged in')
      cy.contains('admin logged in').should('not.exist')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'admin', password: 'password' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()

      cy.get('#title').type('a title created by cypress')
      cy.get('#author').type('an author created by cypress')
      cy.get('#url').type('an url created by cypress')
      cy.get('button').contains('create').click()

      cy.contains('a title created by cypress an author created by cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another title cypress',
          author: 'another author cypress',
          url: 'another url cypress'
        })
      })

      it('user can like a blog', function () {
        cy.get('button').contains('view').click()
        cy.get('button').contains('like').click()
        cy.contains('likes 1')
      })

      it('user can delete a blog', function () {
        cy.get('button').contains('view').click()
        cy.get('button').contains('remove').click()
        cy.contains('another title cypress').should('not.exist')
      })

      describe('and another user exists', function () {
        beforeEach(function () {
          const user = {
            name: 'admin2',
            username: 'admin2',
            password: 'password'
          }
          cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
          cy.login({ username: 'admin2', password: 'password' })
          cy.createBlog({
            title: 'annnnnnother title cypress',
            author: 'annnnnnother author cypress',
            url: 'annnnnnother url cypress'
          })
        })

        it('only the creator can see the remove button', function () {
          cy.contains('another title cypress another author cypress')
            .find('button')
            .should('contain', 'view')
            .click()

          cy.should('not.contain', 'remove')

          cy.contains('annnnnnother title cypress annnnnnother author cypress')
            .find('button')
            .should('contain', 'view')
            .click()

          cy.contains('remove')
        })
      })
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'The title with the least likes',
          author: '1 author cypress',
          url: '1 url cypress'
        })
        cy.createBlog({
          title: 'The title with the most likes',
          author: '2 author cypress',
          url: '2 url cypress'
        })
        cy.createBlog({
          title: 'The title with the second most likes',
          author: '3 author cypress',
          url: '3 url cypress'
        })

        cy.contains('The title with the least likes')
          .find('button')
          .should('contain', 'view')
          .click()
        cy.contains('The title with the most likes')
          .find('button')
          .should('contain', 'view')
          .click()
        cy.contains('The title with the second most likes')
          .find('button')
          .should('contain', 'view')
          .click()

        cy.contains('The title with the least likes')
          .parent()
          .find('button')
          .contains('like')
          .as('like1')
        cy.contains('The title with the most likes')
          .parent()
          .find('button')
          .contains('like')
          .as('like2')
        cy.contains('The title with the second most likes')
          .parent()
          .find('button')
          .contains('like')
          .as('like3')
      })

      it.only('blogs are sorted by likes', function () {
        cy.get('@like1').click()
        cy.wait(500)
        cy.get('@like2').click()
        cy.wait(500)
        cy.get('@like2').click()
        cy.wait(500)
        cy.get('@like2').click()
        cy.wait(500)
        cy.get('@like3').click()
        cy.wait(500)
        cy.get('@like3').click()
        cy.wait(500)

        cy.visit('')

        cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
        cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
        cy.get('.blog').eq(2).should('contain', 'The title with the least likes')
      })
    })
  })

})