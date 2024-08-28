import 'dotenv/config';
import jwt from 'jsonwebtoken';
class jwtService {
    private secret: string = process.env.JWT_SECRET || 'secret';

    sign(payload: object, expiresIn: string | number): string {
        return jwt.sign(payload, this.secret, { expiresIn });
    }

    verify(token: string): boolean {
        try {
            jwt.verify(token, this.secret);
            return true
        } catch (error) {
            // throw new Error('Invalid token');
            return false
        }
    }
}

export default new jwtService();