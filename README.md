# Material.js
アイテム・ブロックに関連するデータを格納した単一のクラス

## Usage
Materialクラス, MaterialTagクラスをimportすることで使えます
```js
import { Material, MaterialTag } from "./Material.js";

Material.CARROT; // 人参
```

### Materialの取得
Materialの静的フィールドにアクセスするか、静的関数`getMaterial()`を使って取得できます
```js
// ダイヤモンドブロックのマテリアル
const diamondBlock = Material.DIAMOND_BLOCK;

// じゃがいものマテリアル
// potatoes, minecraft:potatoなどでも可
const potato =　Material.getMaterial("potato");
```

### インスタンスプロパティ
#### `isBlock`
マテリアルがブロックとして存在できる場合trueが得られます
```js
Material.TNT.isBlock // true
Material.EMERALD.isBlock // false
```

#### `isItem`
マテリアルがアイテムとして存在できる場合trueが得られます
```js
Material.TORCH.isItem // true
Material.YELLOW_CANDLE_CAKE.isItem // false
```
### インスタンスメソッド
#### `hasTag(tag: MaterialTag): boolean`
マテリアルが特定のタグを持っているかを確かめます
```js
Material.WOODEN_SWORD.hasTag(MaterialTag.WEAPONS) // true
```

#### `getTags(): MaterialTag[]`
マテリアルが持つすべてのタグを配列で取得します
```js
Material.OAK_LOG.getTags() // {solid}, {fuels}, {burnable_blocks}, {mineable_by_axe}
```

#### `getBlockPropertyNames(): string[]`
マテリアルがブロックのとき、そのブロックが持つブロック状態名をすべて取得します
> [!WARNING]
> ブロックではない場合`TypeError`を投げるため、`isBlock`を見てから使用してください
```js
Material.OBSERVER.getBlockPropertyNames() // "minecraft:facing_direction", "powered_bit"
```

#### `getAsItemType(): ItemType`
マテリアルがアイテムのとき、対応する`ItemType`を取得します
> [!WARNING]
> アイテムではない場合`TypeError`を投げるため、`isItem`を見てから使用してください

#### `getAsBlockType(): BlockType`
マテリアルがアイテムのとき、対応する`BlockType`を取得します
> [!WARNING]
> アイテムではない場合`TypeError`を投げるため、`isBlock`を見てから使用してください

### 静的メソッド

#### `values(): Material[]`
全マテリアルの配列を返します

### MaterialTagクラス
特定のマテリアルが持つ特性を表現します
<br>静的フィールドへのアクセスまたは`MaterialTag.values()`、`Material#getTags()`によってのみ取得可能です
<br>詳細はMaterialクラスとjsdocを参照してください

### Sample
ブロックたたくと勝手に右手に適正ツールが入ります(手抜き)
```js
import { world, Player } from "@minecraft/server";

import { Material, MaterialTag } from "./Material";

world.afterEvents.entityHitBlock.subscribe(event => {
    if (!(event.damagingEntity instanceof Player)) return;

    const material = Material.getMaterial(event.hitBlockPermutation.type.id);
    const selectedSlot = event.damagingEntity.getComponent("inventory").container.getSlot(event.damagingEntity.selectedSlotIndex);

    if (material.hasTag(MaterialTag.MINEABLE_BY_PICKAXE)) {
        selectedSlot.setItem(new ItemStack(Material.DIAMOND_PICKAXE.getAsItemType()));
    }
    else if (material.hasTag(MaterialTag.MINEABLE_BY_SHOVEL)) {
        selectedSlot.setItem(new ItemStack(Material.DIAMOND_SHOVEL.getAsItemType()));
    }
    else if (material.hasTag(MaterialTag.MINEABLE_BY_AXE)) {
        selectedSlot.setItem(new ItemStack(Material.DIAMOND_AXE.getAsItemType()));
    }
    else if (material.hasTag(MaterialTag.MINEABLE_BY_HOE)) {
        selectedSlot.setItem(new ItemStack(Material.DIAMOND_HOE.getAsItemType()));
    }
});

// 多分これ常時視線先のブロック監視したほうがいいです()
```

## Versions
- 1.21

## License
[MIT LICENSE](/LICENSE)

## Author
Discord: takenoko_4096
Twitter/X: [@Takenoko_4096](x.com/Takenoko_4096)
