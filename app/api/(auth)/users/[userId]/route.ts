import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteUserById,
  getUserByID,
  updateUserById,
} from '../../../../../database/users';

const userType = z.object({
  username: z.string(),
  district: z.string(),
  price: z.string(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const userId = Number(params.userId);

  if (!userId) {
    return NextResponse.json(
      {
        error: 'User id is not valid',
      },
      { status: 400 },
    );
  }

  const singleUser = await getUserByID(userId);

  return NextResponse.json({ user: singleUser });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const userId = Number(params.userId);

  if (!userId) {
    return NextResponse.json(
      {
        error: 'User id is not valid',
      },
      { status: 400 },
    );
  }

  const singleUser = await deleteUserById(userId);

  return NextResponse.json({ user: singleUser });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const userId = Number(params.userId);

  if (!userId) {
    return NextResponse.json(
      {
        error: 'Animal id is not valid',
      },
      { status: 400 },
    );
  }

  const body = await request.json();
  console.log('body', body);
  const result = userType.safeParse(body);
  console.log('result', body);
  if (!result.success) {
    // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages
    console.log(result.error.issues);

    return NextResponse.json(
      {
        error:
          'Request body is missing one of the needed properties name, district and price ',
      },
      { status: 400 },
    );
  }

  const newUser = await updateUserById(
    userId,
    result.data.username,
    result.data.district,
    result.data.price,
  );

  return NextResponse.json({ user: newUser });
}
