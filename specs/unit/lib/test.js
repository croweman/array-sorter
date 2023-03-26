const sorter = require('../../../lib/index.js'),
  expect = require('chai').expect;

const getTestData = () => {
  return [
    {
      firstName: 'a',
      surname: 'd',
      price: 0
    },
    {
      firstName: 'a',
      surname: 'c',
      price: 0
    },
    {
      firstName: 'a',
      surname: 'a',
      price: 0
    },
    {
      firstName: 'b',
      surname: 'd',
      price: 20,
    },
    {
      firstName: 'b',
      surname: 'd',
      price: 10,
    },
    {
      firstName: 'b',
      surname: 'd',
      price: 30,
    },
    {
      firstName: 'b',
      surname: 'a',
      price: 0
    },
    {
      firstName: 'a',
      surname: 'b',
      price: 0
    }
  ];
};

const getComplexNestedTestData = () => {
  return [
    {
      people: [
        {
          details: {
            firstName: 'a',
            surname: 'd',
            price: 0
          }
        }
      ]
    },
    {
      people: [
        {
          details: {
            firstName: 'a',
            surname: 'c',
            price: 0
          }
        }
      ]
    },
    {
      people: [{
        details: {
          firstName: 'a',
          surname: 'a',
          price: 0
        }
      }
      ]
    },
    {
      people: [{
        details: {
          firstName: 'b',
          surname: 'd',
          price: 20,
        }
      }
      ]
    },
    {
      people: [{
        details: {
          firstName: 'b',
          surname: 'd',
          price: 10,
        }
      }
      ]
    },
    {
      people: [{
        details: {
          firstName: 'b',
          surname: 'd',
          price: 30,
        }
      }
      ]
    },
    {
      people: [{
        details: {
          firstName: 'b',
          surname: 'a',
          price: 0
        }
      }]
    },
    {
      people: [{
        details: {
          firstName: 'a',
          surname: 'b',
          price: 0
        }
      }
      ]
    }
  ];
};

describe('array-sorter', () => {
  let originalTestData = getTestData();
  let originalComplexNestedTestData = getComplexNestedTestData();

  describe('single-propety: correctly sorts', () => {
    it('by firstName ascending', () => {
      const testData = originalTestData.slice();

      sorter(testData)
        .orderBy(x => x.firstName)
        .sort();

      expect(testData.length).to.eql(8);

      expect(testData).to.eql([
        originalTestData[0],
        originalTestData[1],
        originalTestData[2],
        originalTestData[7],
        originalTestData[3],
        originalTestData[4],
        originalTestData[5],
        originalTestData[6]
      ]);
    });

    it('by firstName descending', () => {
      const testData = originalTestData.slice();

      sorter(testData)
        .orderByDescending(x => x.firstName)
        .sort();

      expect(testData.length).to.eql(8);

      expect(testData).to.eql([
        originalTestData[3],
        originalTestData[4],
        originalTestData[5],
        originalTestData[6],
        originalTestData[0],
        originalTestData[1],
        originalTestData[2],
        originalTestData[7]
      ]);
    });

    it('by price ascending when using custom comparer', () => {
      const testData = originalTestData.slice();

      const comparer = (valA, valB) => valA - valB;

      sorter(testData)
        .orderBy(x => x.price, comparer)
        .sort();

      expect(testData.length).to.eql(8);

      expect(testData).to.eql([
        originalTestData[0],
        originalTestData[1],
        originalTestData[2],
        originalTestData[6],
        originalTestData[7],
        originalTestData[4],
        originalTestData[3],
        originalTestData[5]
      ]);
    });
  });

  describe('single-propety: correctly sorts when using string value retriever', () => {
    it('by firstName ascending', () => {
      const testData = originalComplexNestedTestData.slice();

      sorter(testData)
          .orderBy('people[0].details.firstName')
          .sort();

      expect(testData.length).to.eql(8);

      expect(testData).to.eql([
        originalComplexNestedTestData[0],
        originalComplexNestedTestData[1],
        originalComplexNestedTestData[2],
        originalComplexNestedTestData[7],
        originalComplexNestedTestData[3],
        originalComplexNestedTestData[4],
        originalComplexNestedTestData[5],
        originalComplexNestedTestData[6]
      ]);
    });

    it('by firstName descending', () => {
      const testData = originalComplexNestedTestData.slice();

      sorter(testData)
          .orderByDescending('people[0].details.firstName')
          .sort();

      expect(testData.length).to.eql(8);

      expect(testData).to.eql([
        originalComplexNestedTestData[3],
        originalComplexNestedTestData[4],
        originalComplexNestedTestData[5],
        originalComplexNestedTestData[6],
        originalComplexNestedTestData[0],
        originalComplexNestedTestData[1],
        originalComplexNestedTestData[2],
        originalComplexNestedTestData[7]
      ]);
    });

    it('by price ascending when using custom comparer', () => {
      const testData = originalComplexNestedTestData.slice();

      const comparer = (valA, valB) => valA - valB;

      sorter(testData)
          .orderBy('people[0].details.price', comparer)
          .sort();

      expect(testData.length).to.eql(8);

      expect(testData).to.eql([
        originalComplexNestedTestData[0],
        originalComplexNestedTestData[1],
        originalComplexNestedTestData[2],
        originalComplexNestedTestData[6],
        originalComplexNestedTestData[7],
        originalComplexNestedTestData[4],
        originalComplexNestedTestData[3],
        originalComplexNestedTestData[5]
      ]);
    });
  });

  describe('two properties: correctly sorts', () => {
    it('by firstName ascending and surname ascending', () => {
      const testData = originalTestData.slice();

      sorter(testData)
        .orderBy(x => x.firstName)
        .thenBy(x => x.surname)
        .sort();

      expect(testData.length).to.eql(8);

      expect(testData).to.eql([
        originalTestData[2],
        originalTestData[7],
        originalTestData[1],
        originalTestData[0],
        originalTestData[6],
        originalTestData[3],
        originalTestData[4],
        originalTestData[5]
      ]);
    });

    it('by firstName ascending and surname descending', () => {
      const testData = originalTestData.slice();

      sorter(testData)
        .orderBy(x => x.firstName)
        .thenByDescending(x => x.surname)
        .sort();

      expect(testData.length).to.eql(8);

      expect(testData).to.eql([
        originalTestData[0],
        originalTestData[1],
        originalTestData[7],
        originalTestData[2],
        originalTestData[3],
        originalTestData[4],
        originalTestData[5],
        originalTestData[6]
      ]);
    });

    it('by firstName descending and surname ascending', () => {
      const testData = originalTestData.slice();
      
      sorter(testData)
        .orderByDescending(x => x.firstName)
        .thenBy(x => x.surname)
        .sort();

      expect(testData.length).to.eql(8);

      expect(testData).to.eql([
        originalTestData[6],
        originalTestData[3],
        originalTestData[4],
        originalTestData[5],
        originalTestData[2],
        originalTestData[7],
        originalTestData[1],
        originalTestData[0]
      ]);
    });

    it('by firstName descending and surname descending', () => {
      const testData = originalTestData.slice();
      
      sorter(testData)
        .orderByDescending(x => x.firstName)
        .thenByDescending(x => x.surname)
        .sort();

      expect(testData.length).to.eql(8);

      expect(testData).to.eql([
        originalTestData[3],
        originalTestData[4],
        originalTestData[5],
        originalTestData[6],
        originalTestData[0],
        originalTestData[1],
        originalTestData[7],
        originalTestData[2]
      ]);
    });
  });

  describe('three properties: correctly sorts', () => {
    it('by firstName ascending, surname ascending and price descending', () => {
      const testData = originalTestData.slice();

      sorter(testData)
        .orderBy(x => x.firstName)
        .thenBy(x => x.surname)
        .thenByDescending(x => x.price)
        .sort();

      expect(testData.length).to.eql(8);

      expect(testData).to.eql([
        originalTestData[2],
        originalTestData[7],
        originalTestData[1],
        originalTestData[0],
        originalTestData[6],
        originalTestData[5],
        originalTestData[3],
        originalTestData[4]
      ]);
    });
  });

  describe('object sorting by string property correctly sorts', () => {
    let originalTestData = [
      { value: 'a' },
      { value: 'B' },
      { value: 'A' },
      { value: 'b' },
      { value: 'C' },
      { value: 'c' },
    ];
    
    it('when using local "en" and options.caseFirst "false"', () => {
      const testData = originalTestData.slice();

      sorter(testData, 'en', { caseFirst: 'false' })
        .orderBy(x => x.value)
        .sort();

      expect(testData).to.eql([
        originalTestData[0],
        originalTestData[2],
        originalTestData[3],
        originalTestData[1],
        originalTestData[5],
        originalTestData[4]
      ]);      
    });

    it('when using local "en" and options.caseFirst "lower"', () => {
      const testData = originalTestData.slice();

      sorter(testData, 'en', { caseFirst: 'lower' })
        .orderBy(x => x.value)
        .sort();

      expect(testData).to.eql([
        originalTestData[0],
        originalTestData[2],
        originalTestData[3],
        originalTestData[1],
        originalTestData[5],
        originalTestData[4]
      ]);      
    });

    it('when using local "en" and options.caseFirst "upper"', () => {
      const testData = originalTestData.slice();

      sorter(testData, 'en', { caseFirst: 'upper' })
        .orderBy(x => x.value)
        .sort();

      expect(testData).to.eql([
        originalTestData[2],
        originalTestData[0],
        originalTestData[1],
        originalTestData[3],
        originalTestData[4],
        originalTestData[5]
      ]);
    });
  });
});
