import supertest from 'supertest';
import server from '@application/server';
import app from '@application/app';
import httpStatus from 'http-status-codes';

const request = supertest(app);

describe('RiskProfile', () => {
  afterAll(async () => {
    server.close();
    await new Promise((resolve) => setTimeout(() => {
      resolve();
    }, 500)); // avoid jest open handle error
  });

  test('Should create the user s risk profile', async (done) => {
    request
      .post('/risk-profile/')
      .send({
        age: 35,
        dependents: 2,
        house: { ownership_status: 'owned' },
        income: 0,
        marital_status: 'married',
        risk_questions: [0, 1, 0],
        vehicle: { year: 2018 },
      })
      .expect('Content-Type', /json/)
      .expect(httpStatus.OK)
      .end((err, res): any => {
        if (err) {
          return done(err);
        }

        const suitability = res.body;

        const expected = {
          auto: 'regular',
          disability: 'ineligible',
          home: 'economic',
          life: 'regular',
        };

        expect(suitability).toEqual(expected);
        return done();
      });
  });
});
