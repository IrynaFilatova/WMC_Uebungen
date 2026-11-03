# Aufgabe KM5-05 — Drizzle ORM

## 1. Vorhersage

### Query A

```typescript
db.select().from(artist).where(eq(artist.gruendungsjahr, 1999));
```

**Erwartetes SQL:**

```sql
SELECT "id", "name", "gruendungsjahr"
FROM "artist"
WHERE "artist"."gruendungsjahr" = ?;
```

**Parameter:** `[1999]`

Die Query wählt alle Künstler aus, die im Jahr 1999 gegründet wurden.

### Query B

```typescript
db.select({ n: count() }).from(album).where(eq(album.artistId, 1));
```

**Erwartetes SQL:**

```sql
SELECT count(*) AS "n"
FROM "album"
WHERE "album"."artist_id" = ?;
```

**Parameter:** `[1]`

Die Query zählt alle Alben des Künstlers mit der ID 1.

### Erklärung

Drizzle erzeugt SQL aus TypeScript-Code. Die Werte werden als Parameter übergeben und nicht direkt in den SQL-Text geschrieben.

## 3. SQL-Vergleich (Interleaving)

### Drizzle ORM

```typescript
const viele = await db
  .select({
    titel: album.titel,
    tracks: count(),
  })
  .from(track)
  .innerJoin(album, eq(track.albumId, album.id))
  .groupBy(album.id);
```

### Reines SQL

```sql
SELECT album.titel, COUNT(*) AS tracks
FROM track
INNER JOIN album ON track.album_id = album.id
GROUP BY album.id;
```

### Vergleich

Beide Queries zählen die Tracks pro Album.

- `innerJoin()` entspricht `INNER JOIN ... ON`.
- `count()` entspricht `COUNT(*)`.
- `groupBy()` entspricht `GROUP BY`.

Drizzle erzeugt SQL automatisch aus TypeScript-Code. Das Ergebnis ist in beiden Fällen gleich.
