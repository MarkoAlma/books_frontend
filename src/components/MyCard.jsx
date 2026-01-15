import { Card, Center, Text, Title, Badge, Group, Image } from '@mantine/core';
import React from 'react';

const MyCard = ({ title, author, description, rating, category, cover}) => {
  return (
    <Card
      className="category-card"
      padding="xl"
      radius="lg"
      withBorder
      style={{
        background: 'linear-gradient(180deg, #171c28 0%, #121624 100%)',
        borderColor: '#232a3a',
        boxShadow: '0 6px 18px rgba(0,0,0,0.45)',
        transition: 'all 0.25s ease',

        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#6366f1';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#232a3a';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Animated border lines */}

      <Image
        src={cover}
        w={"100%"}
        mah={220}
        alt={title}
        fit='contain'
                fallbackSrc="https://placehold.co/135x220?text=Placeholder"
      />

      {/* Title */}
      <Center style={{ flexDirection: 'column', gap: '8px', marginBottom: 12 }}>
        <Title
          order={4}
          fw={700}
          c="#e5e7eb"
          style={{ letterSpacing: '-0.5px', textAlign: 'center' }}
        >
          {title}
        </Title>
        <Text c="#9ca3af" size="sm" italic="true">
          {author}
        </Text>
        <Badge color="indigo" variant="light">
          {category}
        </Badge>
      </Center>

      {/* Description */}
      <Text c="#d1d5db" size="sm" style={{ marginBottom: 12 }}>
        {description}
      </Text>

      {/* Rating */}
      <Group position="apart">
        <Text c="#fbbf24" fw={600}>
          ⭐ {rating} / 5
        </Text>
      </Group>
    </Card>
  );
};

export default MyCard;
