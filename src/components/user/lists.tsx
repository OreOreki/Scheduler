/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { Flex, Grid, Section } from '@radix-ui/themes';
import dayjs from 'dayjs';
import { FC, useCallback, useEffect, useState } from 'react';

import {
  MediaEndDate,
  MediaEntry,
  MediaList,
  MediaStartDate,
} from '@/interfaces/user';

export interface ListProps {
  lists: MediaList[];
}

export const Lists: FC<ListProps> = ({ lists }) => {
  const [sorted, setSorted] = useState<{ list: string; entry: MediaEntry }[]>(
    [],
  );

  const sortingFunction = useCallback(
    (
      first: MediaEndDate | MediaStartDate | null,
      second: MediaEndDate | MediaStartDate | null,
    ) => {
      if (first === null && second === null) {
        // both items don't have a start or end date
        return 0;
      } else if (first === null) {
        // first item does not have a start or end date, second does
        return 1;
      } else if (second === null) {
        // first item has a start or end date, second does not
        return -1;
      }

      const firstDate = new Date();
      if (first.day) firstDate.setDate(first.day);
      if (first.month) firstDate.setMonth(first.month);
      if (first.year) firstDate.setFullYear(first.year);

      const secondDate = new Date();
      if (second.day) secondDate.setDate(second.day);
      if (second.month) secondDate.setMonth(second.month);
      if (second.year) secondDate.setFullYear(second.year);

      return (
        dayjs(firstDate).toDate().getTime() -
        dayjs(secondDate).toDate().getTime()
      );
    },
    [],
  );

  const sort = useCallback(() => {
    const items: { list: string; entry: MediaEntry }[] = [];

    for (const list of lists) {
      for (const entry of list.entries) {
        items.push({ list: list.name, entry });
      }
    }

    setSorted(
      items.sort((first, second) =>
        sortingFunction(
          first.entry.media.endDate || first.entry.media.startDate || null,
          second.entry.media.endDate || second.entry.media.startDate || null,
        ),
      ),
    );
  }, [lists, sortingFunction]);

  useEffect(() => {
    if (lists.length) sort();
  }, [lists, sort]);

  return (
    <Section className="items-center justify-center w-screen" mt='-9'>
      <Flex align="center" justify="center" style={{ width: '100%' }}>
        <Grid columns={{ initial: '1', lg: '2' }} gap="3" mx="5">
          {sorted.map(({ entry }) => {
            const fuzzyDate =
              entry.media.endDate || entry.media.startDate || null;
            const endingDate =
              fuzzyDate.year === null &&
              fuzzyDate.month === null &&
              fuzzyDate.day === null
                ? null
                : new Date();

            if (fuzzyDate && endingDate) {
              if (fuzzyDate.day) endingDate.setDate(fuzzyDate.day);
              if (fuzzyDate.month) endingDate.setMonth(fuzzyDate.month - 1);
              if (fuzzyDate.year) endingDate.setFullYear(fuzzyDate.year);
            }

            return (
              <div
                className="relative rounded-full"
                key={entry.media.id}
                style={{ minHeight: 100 }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-50 rounded-md"
                  style={{
                    backgroundImage: `url(${
                      entry.media.bannerImage || entry.media.coverImage.large
                    })`,
                  }}
                />
                <div className="relative p-4">
                  <h3 className="text-lg font-bold">
                    {entry.media.title.romaji}
                  </h3>
                  <p className="text-sm">
                    Ending:{' '}
                    {endingDate
                      ? dayjs(endingDate).format('MMMM D, YYYY')
                      : 'TBA'}
                  </p>
                </div>
              </div>
            );
          })}
        </Grid>
      </Flex>
    </Section>
  );
};
