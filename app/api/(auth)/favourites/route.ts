import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getFavourites } from '../../../../database/favourites';

const userType = z.object({
  id: z.number(),
  user_giver_id: z.number(),
  user_receiver_id: z.number(),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const favourites = await getFavourites();

  return NextResponse.json({ favourites: favourites });
}
