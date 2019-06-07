import { expect } from 'chai'

describe('Out first test', () => {
  it('should pass', () => {
    expect(true).to.equal(true)
  })
})

// describe("index.html", ()=>{
//   it("should have h1 that says JS Boilerplate", (done)=>{
//     const index = fs.readFileSync("./src/index.html", "utf-8");
//     jsdom.env(index, (err, window) => {
//       const h1 = window.document.getElementsByTagName("h1")[0];
//       expect(h1.innerHTML).to.equal("JS Boilerplate");
//       done();
//       window.close();
//     });
//   });
// });
