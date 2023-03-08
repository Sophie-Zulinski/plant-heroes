import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createUser, getUsers } from '../../../../database/users';

const userType = z.object({
  id: z.string(),
  username: z.string(),
  passwordHash: z.string(),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const users = await getUsers();

  return NextResponse.json({ users: users });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = userType.safeParse(body);

  if (!result.success) {
    // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages
    // console.log(result.error.issues);

    return NextResponse.json(
      {
        error:
          'Request body is missing one of the needed properties name, type and accessory ',
      },
      { status: 400 },
    );
  }

  const newUser = await createUser(
    result.data.username,
    result.data.passwordHash,
  );

  return NextResponse.json({ user: newUser });
}
