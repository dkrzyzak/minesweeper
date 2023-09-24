import d0 from '../assets/digits/d0.png';
import d1 from '../assets/digits/d1.png';
import d2 from '../assets/digits/d2.png';
import d3 from '../assets/digits/d3.png';
import d4 from '../assets/digits/d4.png';
import d5 from '../assets/digits/d5.png';
import d6 from '../assets/digits/d6.png';
import d7 from '../assets/digits/d7.png';
import d8 from '../assets/digits/d8.png';
import d9 from '../assets/digits/d9.png';

export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

const digits: Record<Digit, string> = {
	0: d0,
	1: d1,
	2: d2,
	3: d3,
	4: d4,
	5: d5,
	6: d6,
	7: d7,
	8: d8,
	9: d9,
};

export const getAnalogDigit = (digit: Digit) => digits[digit];
