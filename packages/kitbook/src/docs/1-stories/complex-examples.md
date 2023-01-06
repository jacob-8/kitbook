# A few Complex Examples

## Complex User Interaction

Sometimes building components is more about testing interaction than they are about mocking various component states. In the `BottomSheet` component found in the [svelte-pieces](https://github.com/jacob-8/kitbook/tree/main/packages/svelte-pieces) package also in this monorepo. A Story component was set up that allowed for quick adjustment of some opening height props such that the component can be tested in a variety of conditions.

```svelte title="BottomSheet.md"
<Story
  knobs={{ max: 10, start: 40, contentHeight: 500, duration: 150 }}
  let:knobs={{ max, start, contentHeight, duration }}
  let:set
>
  <ShowHide let:show let:toggle>
    <Button size="sm" onclick={toggle} form="filled">Toggle Show</Button>
    <Button size="sm" onclick={() => set('max', 10)} active={max === 10}>Top max</Button>
    <Button size="sm" onclick={() => set('max', 40)} active={max === 40}>Middle max</Button>
    <Button size="sm" onclick={() => set('max', 85)} active={max === 85}>Bottom max</Button>
    <Button size="sm" onclick={() => set('start', 10)} active={start === 10}>Top Start</Button>
    <Button size="sm" onclick={() => set('start', 40)} active={start === 40}>Middle Start</Button>
    <Button size="sm" onclick={() => set('start', 85)} active={start === 85}>Bottom Start</Button>
    <Button size="sm" onclick={() => set('contentHeight', 500)} active={contentHeight === 500}>Tall Content</Button>
    <Button size="sm" onclick={() => set('contentHeight', 250)} active={contentHeight === 250}>Med Content</Button>
    <Button size="sm" onclick={() => set('contentHeight', 100)} active={contentHeight === 100}>Short Content</Button>
    {#if show}
      <BottomSheet on:close={toggle} {max} {start} {duration}>
        <div slot="header">
          Title
          <Button
            size="sm"
            form="simple"
            onclick={() => set('contentHeight', 250)}
            active={contentHeight === 250}>Med Content</Button>
          <Button
            size="sm"
            form="simple"
            onclick={() => set('contentHeight', 100)}
            active={contentHeight === 100}>Short Content</Button>
        </div>
        <p class="bg-gray-100" style="height: {contentHeight}px">Content</p>
      </BottomSheet>
    {/if}
  </ShowHide>
</Story>
```

Note especially the use of the helper `ShowHide` component. As a Story is just Svelte, you can do anything, even use `setContext` in your stories file.

## Conglomeration of many components

Sometimes you may want to prototype an arrangement of multiple components together. The following example combines a `Map`, `GeoJSONSource`, and `Layer` component from the [Living Dictionaries repo](https://github.com/livingtongues/living-dictionaries) into a display of earthquake clusters.

```svelte title="EarthquakeClusters.md"
<script lang="ts">
  import { Story } from 'kitbook';
  import Map from '$lib/maps/mapbox/map/Map.svelte';
  import GeoJSONSource from '$lib/maps/mapbox/sources/GeoJSONSource.svelte';
  import Layer from '$lib/maps/mapbox/map/Layer.svelte';
  const clustersId = 'clusters';
</script>

# GeoJSON Layer to Clusters

<Story name="earthquake clusters" height={350}>
  <Map let:map>
    <GeoJSONSource
      data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
      options={{ cluster: true, clusterMaxZoom: 14, clusterRadius: 50 }}
      let:source>
      <Layer
        id={clustersId}
        options={{
          type: 'circle',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#51bbd6',
              100,
              '#f1f075',
              750,
              '#f28cb1',
            ],
            'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
          },
        }}
        on:click={({ detail }) => {
          const features = map.queryRenderedFeatures(detail.point, {
            layers: [clustersId],
          });
          const clusterId = features[0].properties.cluster_id;
          source.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;
            map.easeTo({
              // @ts-ignore
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
          });
        }}
        on:mouseenter={() => (map.getCanvas().style.cursor = 'pointer')}
        on:mouseleave={() => (map.getCanvas().style.cursor = '')} />
      <Layer
        options={{
          type: 'symbol',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
          },
        }} />
      <Layer
        options={{
          type: 'circle',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff',
          },
        }}
        on:click={() => alert('point clicked')}
        on:mouseenter={() => (map.getCanvas().style.cursor = 'pointer')}
        on:mouseleave={() => (map.getCanvas().style.cursor = '')} />
    </GeoJSONSource>
  </Map>
</Story>
```