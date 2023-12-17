'use client';

import { Avatar, Box, Card, Flex, Grid, Section, Text } from '@radix-ui/themes';
import truncate from 'lodash/truncate';
import { Shell } from 'lucide-react';
import Link from 'next/link';
import { FC, useEffect } from 'react';
import { useQuery } from 'urql';

import { QueryResponse } from '@/interfaces/anilist';
import { SEARCH_USER } from '@/lib/queries';

import { useToast } from './ui/use-toast';

export interface QueryParams {
  username: string;
}

export const Query: FC<QueryParams> = ({ username }) => {
  const [{ data, fetching, error }, refetch] = useQuery<QueryResponse>({
    query: SEARCH_USER,
    variables: {
      page: 1,
      query: username,
    },
  });

  const { toast } = useToast();

  useEffect(() => {
    if (username) refetch();
  }, [refetch, username]);

  useEffect(() => {
    if (error)
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
  }, [error, toast]);

  if (fetching)
    return (
      <div className="flex items-center justify-center w-screen mt-5">
        <Shell className="animate-spin rounded-full h-16 w-16 text-violet-500" />
      </div>
    );

  return (
    <Section className="flex flex-col items-center justify-center w-screen">
      <Text mb="4" size="6" weight="bold">
        {data?.Page.users.length ?? 0} results
      </Text>

      <Grid columns={{ initial: '1', md: '2', lg: '3' }} gap="3">
        {data?.Page.users.map((user) => (
          <Link
            href={`/user/${user.id}`}
            key={`${user.id}-${user.name}`}
            style={{ textDecoration: 'none' }}
          >
            <Card size="1" style={{ width: 350, maxHeight: 70 }}>
              <Flex align="center" gap="3">
                <Avatar
                  color="indigo"
                  fallback={user.name.charAt(0)}
                  radius="full"
                  size="3"
                  src={user.avatar.large}
                />
                <Box>
                  <Text as="div" size="2" weight="bold">
                    {user.name}
                  </Text>
                  <Text as="div" color="gray" size="2">
                    {truncate(user.about, {
                      length: 30,
                    })}
                  </Text>
                </Box>
              </Flex>
            </Card>
          </Link>
        ))}
      </Grid>
    </Section>
  );
};
