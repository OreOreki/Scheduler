/* eslint-disable jsx-a11y/img-redundant-alt */

'use client';

import {
  Box,
  Button,
  DropdownMenu,
  Flex,
  Section,
  Text,
} from '@radix-ui/themes';
import truncate from 'lodash/truncate';
import { ArrowDownIcon, Shell } from 'lucide-react';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { useQuery } from 'urql';

import { QueryResponse } from '@/interfaces/user';
import { GET_USER } from '@/lib/queries';

import { useToast } from '../ui/use-toast';

import { Lists } from './lists';

export interface UserProps {
  id: string;
}

export const User: FC<UserProps> = ({ id }) => {
  const [{ data, fetching, error }, refetch] = useQuery<QueryResponse>({
    query: GET_USER,
    variables: {
      id: parseInt(id),
    },
  });

  const [user, setUser] = useState<{
    user: QueryResponse['User'];
    lists: QueryResponse['MediaListCollection'];
  } | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const { toast } = useToast();

  useEffect(() => {
    if (id) refetch();
  }, [refetch, id]);

  useEffect(() => {
    if (data) setUser({ lists: data.MediaListCollection, user: data.User });
  }, [data]);

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
      {user ? (
        <>
          <div className="relative">
            <Image
              alt="User banner image"
              className="rounded-md object-cover w-[1200px] h-[200px]"
              height={200}
              src={
                user.user.bannerImage ||
                'https://bestwallpapers.in/wp-content/uploads/2018/08/anime-night-scenery-4k-wallpaper-1024x576.jpg'
              }
              width={600}
            />
            <div className="absolute -bottom-24 left-0 p-4">
              <Flex align="center" direction="row" gap="1" justify="center">
                <Image
                  alt={user.user.name}
                  className="rounded-full"
                  height={100}
                  src={user.user.avatar.large}
                  width={100}
                />
                <Box className="flex flex-col">
                  <Text
                    className="ml-1 mt-2"
                    color="violet"
                    size="5"
                    weight="bold"
                  >
                    {user.user.name}
                  </Text>
                  <Text size="3" weight="medium">
                    {truncate(user.user.about, { length: 50 })}
                  </Text>
                </Box>
              </Flex>
            </div>
          </div>

          <Section
            className="flex flex-col items-center justify-center w-[80%]"
            mt="5"
          >
            <Flex align="center" direction="row" justify="between" width="100%">
              <Flex justify="start">
                <Text color="violet" size="4">
                  Lists (Selected: {selected.length})
                </Text>
              </Flex>

              <Flex justify="end">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="outline">
                      Lists
                      <ArrowDownIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    {user.lists.lists.length
                      ? user.lists.lists.map((list) => (
                          <DropdownMenu.Item
                            color={
                              selected.includes(list.name) ? 'violet' : 'gray'
                            }
                            key={list.name}
                            onSelect={() => {
                              handleSelect(list.name);
                            }}
                          >
                            {list.name}
                          </DropdownMenu.Item>
                        ))
                      : null}
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            </Flex>
          </Section>

          <Lists
            lists={user.lists.lists.filter((list) =>
              selected.includes(list.name),
            )}
          />
        </>
      ) : null}
    </Section>
  );
};
