import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect
const requester = supertest(`http://localhost:8080`)

describe.only('Testing Router Session', () => {
    it('POST /api/session/login -- Debe ser redireccionado al faillogin si el usuario/contraseña son incorrectos', async () => {
        const mockUser = {
            email: "asdp123421111nlf@gmail.com",
            password: "12134321d",
        }

        const { statusCode, redirect, text} = await requester.post('/api/session/login').send(mockUser)
        expect(statusCode).to.equal(302)
        expect(redirect).to.equal(true)
        expect(text).to.contain('Redirecting').and.to.contain('/api/session/faillogin')
    })

    it('POST /api/session/register -- Debe crear/registrar un usuario', async () => {
        const mockUser = {
            first_name: "Xavi",
            last_name: "Dosada",
            email: "asdp10121ddds1nlf@gmail.com",
            dob: "11/11/2023",
            password: "123asd",
            role: "user"
        }

        const { body, statusCode } = await requester.post('/api/session/register').send(mockUser)
        expect(statusCode).to.equal(201)
        expect(body).to.have.property('status', 'success')
        expect(body).to.have.property('payload')
    })
    
})
