import supertest from 'supertest';
import server from '@application/server';
import app from '@application/app';
import httpStatus from 'http-status-codes';

const request = supertest(app);

describe('UserSchema', () => {
  afterAll(async () => {
    server.close();
    await new Promise((resolve) => setTimeout(() => {
      resolve();
    }, 500)); // avoid jest open handle error
  });

  test('Should not create the user s risk profile when missing required attributes', async (done) => {
    request
      .post('/risk-profile/')
      .send()
      .expect('Content-Type', /json/)
      .expect(httpStatus.BAD_REQUEST)
      .end((err, res): any => {
        const missingFields = '{"code":"RPJGNC0003","message":"ValidationError: \\"age\\" is required. \\"dependents\\" is required. \\"income\\" is required. \\"marital_status\\" is required. \\"risk_questions\\" is required","field":"body"}';

        const { text } = res;

        expect(text).toEqual(missingFields);
        return done();
      });
  });

  test('Should not create the user s risk profile when integer attributes are invalid', async (done) => {
    request
      .post('/risk-profile/')
      .send({
        age: -1,
        dependents: 'two dependents',
        house: { ownership_status: 'owned' },
        income: -100,
        marital_status: 'married',
        risk_questions: [0, 1, 0],
        vehicle: { year: 2018 },
      })
      .expect('Content-Type', /json/)
      .expect(httpStatus.BAD_REQUEST)
      .end((err, res): any => {
        const invalidAttribute = '{"code":"RPJGNC0003","message":"ValidationError: \\"age\\" must be greater than or equal to 0. \\"dependents\\" must be a number. \\"income\\" must be greater than or equal to 0","field":"body"}';

        const { text } = res;

        expect(text).toEqual(invalidAttribute);
        return done();
      });
  });

  test('Should not create the user s risk profile when marital status is invalid', async (done) => {
    request
      .post('/risk-profile/')
      .send({
        age: 35,
        dependents: 2,
        house: { ownership_status: 'owned' },
        income: 0,
        marital_status: 'happy',
        risk_questions: [0, 1, 0],
        vehicle: { year: 2018 },
      })
      .expect('Content-Type', /json/)
      .expect(httpStatus.BAD_REQUEST)
      .end((err, res): any => {
        const invalidAttribute = '{"code":"RPJGNC0003","message":"ValidationError: \\"marital_status\\" must be one of [single, married]","field":"body"}';

        const { text } = res;

        expect(text).toEqual(invalidAttribute);
        return done();
      });
  });

  test('Should not create the user s risk profile when more or less than 3 risk answers', async (done) => {
    request
      .post('/risk-profile/')
      .send({
        age: 35,
        dependents: 2,
        house: { ownership_status: 'owned' },
        income: 0,
        marital_status: 'married',
        risk_questions: [0, 1, 0, 4],
        vehicle: { year: 2018 },
      })
      .expect('Content-Type', /json/)
      .expect(httpStatus.BAD_REQUEST)
      .end((err, res): any => {
        const invalidAttribute = '{"code":"RPJGNC0003","message":"ValidationError: \\"risk_questions\\" must contain at most 3 items","field":"body"}';

        const { text } = res;

        expect(text).toEqual(invalidAttribute);
        return done();
      });
  });

  test('Should not create the user s risk profile when risk answers is not a boolean', async (done) => {
    request
      .post('/risk-profile/')
      .send({
        age: 35,
        dependents: 32,
        house: { ownership_status: 'owned' },
        income: 0,
        marital_status: 'married',
        risk_questions: [0, 1, 2],
        vehicle: { year: 2018 },
      })
      .expect('Content-Type', /json/)
      .expect(httpStatus.BAD_REQUEST)
      .end((err, res): any => {
        const invalidAttribute = '{"code":"RPJGNC0003","message":"ValidationError: \\"risk_questions[2]\\" must be less than or equal to 1","field":"body"}';

        const { text } = res;

        expect(text).toEqual(invalidAttribute);
        return done();
      });
  });

  test('Should not create the user s risk profile when house has a invalid status', async (done) => {
    request
      .post('/risk-profile/')
      .send({
        age: 35,
        dependents: 12,
        house: { ownership_status: 'Shakira' },
        income: 1000.00,
        marital_status: 'single',
        risk_questions: [0, 0, 0],
        vehicle: { year: 2004 },
      })
      .expect('Content-Type', /json/)
      .expect(httpStatus.BAD_REQUEST)
      .end((err, res): any => {
        const invalidAttribute = '{"code":"RPJGNC0003","message":"ValidationError: \\"house.ownership_status\\" must be one of [owned, mortgaged]","field":"body"}';

        const { text } = res;

        expect(text).toEqual(invalidAttribute);
        return done();
      });
  });

  test('Should not create the user s risk profile when vehicle has a invalid year', async (done) => {
    request
      .post('/risk-profile/')
      .send({
        age: 35,
        dependents: 2,
        house: { ownership_status: 'mortgaged' },
        income: 100,
        marital_status: 'married',
        risk_questions: [0, 1, 1],
        vehicle: { year: 'im a car' },
      })
      .expect('Content-Type', /json/)
      .expect(httpStatus.BAD_REQUEST)
      .end((err, res): any => {
        const invalidAttribute = '{"code":"RPJGNC0003","message":"ValidationError: \\"vehicle.year\\" must be a number","field":"body"}';

        const { text } = res;

        expect(text).toEqual(invalidAttribute);
        return done();
      });
  });
});
