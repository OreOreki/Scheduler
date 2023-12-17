/* eslint-disable @typescript-eslint/prefer-reduce-type-parameter */
import { Container, Flex, Section, Text } from '@radix-ui/themes';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useEffect, useMemo, useState } from 'react';

import { MediaEntry, MediaList } from '@/interfaces/user';
import { fuzzyDate } from '@/lib/utils';

export interface ListProps {
  lists: MediaList[];
}

export const Lists: FC<ListProps> = ({ lists }) => {
  const [data, setData] = useState<Record<string, MediaEntry[]>>({});

  useEffect(() => {
    const newData: Record<string, MediaEntry[]> = {};

    for (const list of lists) {
      for (const entry of list.entries) {
        const date =
          fuzzyDate(entry.media.endDate) ||
          fuzzyDate(entry.media.startDate) ||
          'TBA';

        const dateString = typeof date === 'string' ? date : date.toString();
        newData[dateString] = [...(newData[dateString] || []), entry];
      }
    }

    setData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  }, [lists]);

  const sorted = useMemo(() => {
    return Object.entries(data)
      .sort((a, b) => {
        const dateA = a[0] === 'TBA' ? Infinity : dayjs(new Date(a[0]));
        const dateB = b[0] === 'TBA' ? Infinity : dayjs(new Date(b[0]));

        if (dateA === Infinity && dateB !== Infinity) {
          return 1;
        }

        if (dateB === Infinity && dateA !== Infinity) {
          return -1;
        }

        if ((dateA as Dayjs).isBefore(dateB)) {
          return -1;
        }

        if ((dateA as Dayjs).isAfter(dateB)) {
          return 1;
        }

        return 0;
      })
      .reduce(
        (obj, [key, value]) => {
          obj[key] = value;
          return obj;
        },
        {} as Record<string, MediaEntry[]>,
      );
  }, [data]);

  return (
    <Section className="items-center justify-center w-screen" mt="-9">
      <Flex
        align="center"
        direction="column"
        gap="9"
        justify="center"
        style={{ width: '100%' }}
      >
        {Object.keys(sorted).length > 0
          ? Object.entries(sorted).map(([key, value]) => (
              <Container className="w-full" key={key}>
                <Flex
                  align="center"
                  direction={{ initial: 'column', md: 'row' }}
                  justify={{ initial: 'center', md: 'between' }}
                >
                  <Flex align="center" justify="start">
                    <Text size="3" weight="medium">
                      {key === 'TBA'
                        ? key
                        : dayjs(new Date(key)).format('MMMM D, YYYY')}
                    </Text>
                  </Flex>

                  <Flex align="center" justify="end" style={{ width: 'auto' }}>
                    <Flex
                      align="center"
                      direction="column"
                      gap="3"
                      justify="center"
                    >
                      {value.map((entry) => (
                        <div
                          className="relative rounded-full md:w-[700px] sm:w-[400px] min-w-[300px]"
                          key={entry.media.id}
                          style={{ minHeight: 100, minWidth: 420 }}
                        >
                          <div
                            className="absolute inset-0 bg-cover bg-center opacity-50 rounded-md md:w-[700px] sm:w-[400px] min-w-[300px]"
                            style={{
                              backgroundImage: `url(${
                                entry.media.bannerImage ||
                                entry.media.coverImage.large
                              })`,
                            }}
                          />
                          <div className="relative p-4">
                            <h3 className="text-sm md:text-lg font-bold">
                              {entry.media.title.romaji}
                            </h3>
                            {fuzzyDate(entry.media.endDate) ? (
                              <p className="text-xs md:text-sm">
                                Ending:{' '}
                                {dayjs(fuzzyDate(entry.media.endDate)).format(
                                  'MMMM D, YYYY',
                                )}
                              </p>
                            ) : null}

                            {fuzzyDate(entry.media.startDate) ? (
                              <p className="text-xs md:text-sm">
                                Starting:{' '}
                                {dayjs(fuzzyDate(entry.media.startDate)).format(
                                  'MMMM D, YYYY',
                                )}
                              </p>
                            ) : null}

                            {!fuzzyDate(entry.media.endDate) &&
                            !fuzzyDate(entry.media.startDate) ? (
                              <p className="text-xs md:text-sm">TBA</p>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </Flex>
                  </Flex>
                </Flex>
              </Container>
            ))
          : null}
      </Flex>
    </Section>
  );
};
