const request = require('supertest')
const {app, server} = require('../src/index');

describe('Product tests', () => {

    it('should have no product', async () => {

		const res = await request(app)
			.get('/api/products')

		
		expect(res.status).toEqual(200)
		expect(res.body).toHaveProperty('element')
		expect(res.body.element).toHaveLength(0)
	})

	it('insert product', async() => {

		const res = await request(app)
			.post('/api/products')
			.send({
				"name": "test2",
				"price": 17.50,
				"quantity": 4
			})

			expect(res.status).toEqual(201)
			expect(res.body).toHaveProperty('element')
			expect(res.body.element).toEqual({
				"name": "test2",
				"price": 17.50,
				"quantity": 4
			})
			expect(res.body).toHaveProperty('success')
			expect(res.body.success).toEqual(true)
	})

	it('insert product with error', async() => {

		const res = await request(app)
			.post('/api/products')
			.send({
				"name": "test2",
				"price": 17.50
			})

			expect(res.status).toEqual(422)
			expect(res.body).toHaveProperty('success')
			expect(res.body.success).toEqual(false)
	})

	afterAll(() => {
		server.close()
	})
})