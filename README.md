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
マテリアルがブロックのとき、対応する`BlockType`を取得します
> [!WARNING]
> ブロックではない場合`TypeError`を投げるため、`isBlock`を見てから使用してください

### 静的メソッド

#### `values(): Material[]`
全マテリアルの配列を返します

#### `getMaterial(id: string): Material | undefined`
ブロックIDあるいはアイテムIDを渡すと対応するMaterialが返ります
<br>`ItemType`と`BlockType`の相互変換はこれを介して可能です

### MaterialTagクラス
特定のマテリアルが持つ特性を表現します
<br>以下によってのみ取得できます：
- 静的フィールドへのアクセス
- `MaterialTag.values()`
- `Material#getTags()`

#### タグリスト
```js
MaterialTag.COMPOSTABLE // コンポスターに入れられるアイテム
MaterialTag.FOODS // 食べられるアイテム
MaterialTag.SOLID_BlOCKS // 固体のブロック
MaterialTag.RECORDS // レコード
MaterialTag.ENCHANTABLE // エンチャント可能なアイテム
MaterialTag.BURNABLE_BLOCKS // 可燃性を持つブロック
MaterialTag.FUELS // 燃料になれるアイテム
MaterialTag.LIGHT_PASSABLE_BLOCKS // 光を通すブロック
MaterialTag.ARMORS // 装備
MaterialTag.TOOLS // ツール
MaterialTag.WEAPONS // 武器
MaterialTag.MINEABLE_BY_PICKAXE // ピッケルが適正ツールのブロック
MaterialTag.MINEABLE_BY_AXE // 斧が適正ツールのブロック
MaterialTag.MINEABLE_BY_SHOVEL // シャベルが適正ツールのブロック
MaterialTag.MINEABLE_BY_HOE // クワが適正ツールのブロック
MaterialTag.PLANKS // 木材
MaterialTag.LOGS // 原木(丸太)
MaterialTag.SLABS // ハーフブロック
MaterialTag.DAMAGABLE_ITEMS // 耐久値を持つアイテム
```

### Samples
#### ブロックたたくと勝手に右手に適正ツールが入ります(手抜き)
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
Twitter/X: [@Takenoko_4096](https://x.com/Takenoko_4096)
