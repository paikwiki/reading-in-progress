/* eslint no-undef: 0 */
import Dog from '../src/js/Dog';

it('IsWhat mathod returns a description of pet\'s name', () => {
  const ddolmang = new Dog('ddolmang');
  const sheIs = ddolmang.isWhat();
  expect(sheIs).toEqual('ddolmang is a 🐶');
});
