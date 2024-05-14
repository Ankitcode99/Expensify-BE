import * as jwt from 'jsonwebtoken';

export class JwtUtil {
  private static readonly secret: string = "FAKE_SECRET_KEY"; // Replace with a strong secret key

  static generateToken(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: '1h' }); // Adjust expiration time as needed
  }

  static async verifyToken(token: string): Promise<object | null> {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      return null; // Handle invalid token errors appropriately
    }
  }
}
