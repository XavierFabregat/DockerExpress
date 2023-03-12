import { CustomResponse } from "../../Lib/Response";

describe("CustomResponse", () => {

  it('should expose a static success method', () => {
    expect(CustomResponse.success).toBeDefined();
  })

  it('should expose a static error method', () => {
    expect(CustomResponse.error).toBeDefined();
  });

  it('should return a success response when success is called', () => {
    const res = CustomResponse.success({
      property1: 'value1',
      property2: 'value2'
    },'message', 200);
    expect(res.data).toStrictEqual({
      property1: 'value1',
      property2: 'value2'
    });
    expect(res.message).toBe('message');
    expect(res.status).toBe(200);
  });

  it('should return an error response when error is called', () => {
    const res = CustomResponse.error(new Error('error message'), 400 ,'message');
    expect(res.data).toBe(null);
    expect(res.message).toBe('message');
    expect(res.status).toBe(400);
    expect(res.error).toStrictEqual(new Error('error message'));
  });
});