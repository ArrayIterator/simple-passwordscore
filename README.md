# Simple Password Strength Checker & Generator

This is a simple password strength checker and generator.
It is a simple javascript that can be used to check the strength of a password and generate a strong password.


## Installation

```bash
npm install simple-passwordscore
```


## Usage

```javascript
import {
    ScorePassword,
    GeneratePassword
} from 'simple-passwordscore';

/**
 * Score password return -1 to 3
 * @type {number} score
 */
const score = ScorePassword('password');

/**
 * Generate password return a random password, 12 is length of password
 * Default length is 12
 * @type {string} password
 */
const password = GeneratePassword(12);
```
