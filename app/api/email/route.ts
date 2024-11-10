import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

// Define the response structure
interface ApiResponse {
  message?: string;
  data?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> {
    console.log("WORKS")
    const { email } = req.body;
    console.log(email)

    // Validate email input
    if (!email || typeof email !== 'string') {
      res.status(400).json({ error: 'Invalid email address' });
      return;
    }

    try {
      // Insert the email into the 'subscribers' table
      const result = await sql`
        INSERT INTO subscribers (email)
        VALUES (${email})
        RETURNING *;
      `;

      res.status(200).json({
        message: 'Email successfully added',
        data: result.rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to save email to database' });
    }
}
