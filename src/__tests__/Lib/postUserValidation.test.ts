import { 
  postUserValidation, 
  validateUsername, 
  validatePassword, 
  validateUpdatePasswords
} from '../../Lib/postUserValidation';

describe('postUserValidation', () => {

  it('should return false if username is not provided', () => {
    const res = postUserValidation('', 'password', 'password')
    expect(res.valid).toBe(false);
    expect(res.message).toBe('Username and password are required');
  });

  it('should return false if password is not provided', () => {
    const res = postUserValidation('username', '', 'password')
    expect(res.valid).toBe(false);
    expect(res.message).toBe('Username and password are required');
  });

  it('should return false if repeat password is not provided', () => {
    const res = postUserValidation('username', 'password', '')
    expect(res.valid).toBe(false);
    expect(res.message).toBe('Username and password are required');
  });

  it('should return false if username is less than 6 characters', () => {
    const res = postUserValidation('user', 'password!', 'password!')
    expect(res.valid).toBe(false);
    expect(res.message).toBe('Username must be at least 6 characters');
  });

  it('should return false if password is less than 6 characters', () => {
    const res = postUserValidation('username', 'pass', 'pass')
    expect(res.valid).toBe(false);
    expect(res.message).toBe('Password invalid.');
  });

  it('should return false if password does not contain a special character', () => {
    const res = postUserValidation('username', 'password', 'password')
    expect(res.valid).toBe(false);
    expect(res.message).toBe('Password invalid.');
  });

  it('should return false if passwords do not match', () => {
    const res = postUserValidation('username', 'password!', 'password-')
    expect(res.valid).toBe(false);
    expect(res.message).toBe('Passwords do not match');
  });

  it('should return true if username and password are valid', () => {
    const res = postUserValidation('username', 'password!', 'password!')
    expect(res.valid).toBe(true);
    expect(res.message).toBe('');
  });
});

describe('validateUsername', () => {
  it('should return false if username is less than 6 characters', () => {
    const res = validateUsername('user')
    expect(res.valid).toBe(false);
    expect(res.message).toBe('Username must be at least 6 characters');
  });

  it('should return true if username is at least 6 characters', () => {
    const res = validateUsername('username')
    expect(res.valid).toBe(true);
    expect(res.message).toBe('');
  });
});

describe('validatePassword', () => {
  it('should return false if password is less than 6 characters', () => {
    const res = validatePassword('pass')
    expect(res.valid).toBe(false);
    expect(res.message).toBe('Password invalid.');
  });

  it('should return false if password does not contain a special character', () => {
    const res = validatePassword('password')
    expect(res.valid).toBe(false);
    expect(res.message).toBe('Password invalid.');
  });

  it('should return true if password is at least 6 characters and contains a special character', () => {
    const res = validatePassword('password!')
    expect(res.valid).toBe(true);
    expect(res.message).toBe('');
  });
});

describe('validateUpdatePasswords', () => {
  it('should return false if password is less than 6 characters', () => {
    const res = validateUpdatePasswords('pass', 'pass')
    expect(res.valid).toBe(false);
    expect(res.message).toBe('Password/s invalid.');
  });

  it('should return false if password does not contain a special character', () => {
    const res = validateUpdatePasswords('password', 'password')
    expect(res.valid).toBe(false);
    expect(res.message).toBe('Password/s invalid.');
  });

  it('should return false if repeat password is less than 6 characters', () => {
    const res = validateUpdatePasswords('password!', 'pass')
    expect(res.valid).toBe(false);
    expect(res.message).toBe('Password/s invalid.');
  });

  it('should return false if repeat password does not contain a special character', () => {
    const res = validateUpdatePasswords('password!', 'password')
    expect(res.valid).toBe(false);
    expect(res.message).toBe('Password/s invalid.');
  });

  it('should return false if password is not provided', () => {
    const res = validateUpdatePasswords('', 'password!')
    expect(res.valid).toBe(false);
    expect(res.message).toBe('Password/s invalid.');
  });

  it('should return false if repeat password is not provided', () => {
    const res = validateUpdatePasswords('password!', '')
    expect(res.valid).toBe(false);
    expect(res.message).toBe('Password/s invalid.');
  });

  it('should return false if passwords do not match', () => {
    const res = validateUpdatePasswords('password!', 'password-')
    expect(res.valid).toBe(false);
    expect(res.message).toBe('Passwords do not match');
  });

  it('should return true if passwords are valid', () => {
    const res = validateUpdatePasswords('password!', 'password!')
    expect(res.valid).toBe(true);
    expect(res.message).toBe('');
  });
});