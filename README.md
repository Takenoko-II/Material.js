# Material.js
アイテム・ブロックに関連するデータを格納した単一のクラス
<br>MinecraftItemTypes, MinecraftBlockTypesの(自称)上位互換

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
const itemStack = new ItemStack("potato");
const potato =　Material.getMaterial(itemStack);
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

#### `getItemMaxStackSize(): number`
マテリアルがアイテムのとき、そのアイテムの最大スタック数を取得します
> [!WARNING]
> アイテムではない場合`TypeError`を投げるため、`isItem`を見てから使用してください
```js
Material.ENDER_PEARL.getItemMaxStackSize() // 16
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

#### `getMaterial(id: string | ItemStack | Block | ItemType | BlockType): Material | undefined`
ブロックIDあるいはアイテムIDを渡すと対応するMaterialが返ります
<br>`ItemType`と`BlockType`の相互変換はこれを介して可能です

#### `getDeprecated(id: string): Material | undefined`
ブロックIDあるいはアイテムIDを渡すと対応する非推奨のMaterialが返ります
> [!NOTE]
> 非推奨としてマークされているマテリアルは、この関数とプロパティへの直接的なアクセス以外では取得できないようにしています
> minecraft:woolなども該当しますが、基本的には代替としてMaterialTag.WOOLSなどを使用することを推奨します

### MaterialTagクラス
特定のマテリアルが持つ特性を表現します
<br>以下によってのみ取得できます：
- 静的フィールドへのアクセス
- `MaterialTag.values()`
- `Material#getTags()`

#### タグリスト
現在59のタグがあります
```js
MaterialTag.COMPOSTABLE // コンポスターに入れられるアイテム
MaterialTag.FOODS // 食べられるアイテム
MaterialTag.SOLID_BLOCKS // 固体のブロック
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
MaterialTag.BASE_STONES_OVERWORLD // オーバーワールドを構成する主な石
MaterialTag.STAIRS // 階段
MaterialTag.ARMOR_TRIM_TEMPLATES // 鍛冶型
MaterialTag.ARMOR_TRIM_MATERIALS // アーマートリムの色となる材料
MaterialTag.LEAVES // 葉っぱ
MaterialTag.PUMPKINS // カボチャ
MaterialTag.BLOCKS_COPPER // 銅系ブロック
MaterialTag.STAINED_GLASSES // 色付きガラス
MaterialTag.STAINED_GLASS_PANES // 色付きガラス板
MaterialTag.TORCHES // トーチ系
MaterialTag.WOOLS // 羊毛
MaterialTag.BEACON_BASE_BLOCKS // ビーコンの土台になれるブロック
MaterialTag.BLOCKS_PURPUR // プルプァ系
MaterialTag.TRAPDOORS // トラップドア
MaterialTag.DOORS // ドア
MaterialTag.FLOWERS // 花
MaterialTag.FENCES // フェンス(ゲートは含まない)
MaterialTag.FENCE_GATES // フェンスゲート
MaterialTag.CONCRETE_POWDERS // コンクリートパウダー
MaterialTag.CONCRETES // コンクリート
MaterialTag.BLOCKS_FALL_DISTANCE_RESETTING // エンティティの落下距離をリセットするブロック
MaterialTag.BOATS // ボート
MaterialTag.BUCKETS // バケツ
MaterialTag.CLIMBABLE_BLOCKS // はしごのように登れるブロック
MaterialTag.BLOCKS_QUARTZ // クォーツ系
MaterialTag.TRIMMABLE_ARMORS // アーマートリムを適用可能な防具アイテム
MaterialTag.SPAWN_EGGS // スポーンエッグ
MaterialTag.SAPLINGS // 苗木
MaterialTag.GLAZED_TERRACOTTAS // 彩色テラコッタ
MaterialTag.BLOCKS_CROP // 作物
MaterialTag.BASE_STONES_NETHER // ネザーを構成する主な石
MaterialTag.WALLS // 壁
MaterialTag.SIGNS // 看板
MaterialTag.RAILS // レール
MaterialTag.PRESSURE_PLATES // 感圧版
MaterialTag.BUTTONS // ボタン
MaterialTag.ORES // 鉱石
MaterialTag.TERRACOTTAS // テラコッタ
MaterialTag.ICES // 氷
MaterialTag.HELMETS // ヘルメット
MaterialTag.CHESTPLATES // チェストプレート
MaterialTag.LEGGINGS // レギンス
MaterialTag.BOOTS // ブーツ
MaterialTag.SWORDS // 剣
MaterialTag.PICKAXES // ピッケル
MaterialTag.AXES // 斧
MaterialTag.SHOVELS // シャベル
MaterialTag.HOES // クワ
MaterialTag.WOODEN_TOOLS // 木ツール
MaterialTag.STONE_TOOLS // 石ツール
MaterialTag.IRON_TOOLS // 鉄ツール
MaterialTag.GOLDEN_TOOLS // 金ツール
MaterialTag.DIAMOND_TOOLS // ダイヤツール
MaterialTag.NETHERITE_TOOLS // ネザライトツール
MaterialTag.BLOCKS_INCORRECT_FOR_WOODEN_TOOLS // 木ツールで収集不可能なブロック
MaterialTag.BLOCKS_INCORRECT_FOR_STONE_TOOLS // 石ツールで収集不可能なブロック
MaterialTag.BLOCKS_INCORRECT_FOR_IRON_TOOLS // 鉄ツールで収集不可能なブロック
MaterialTag.BLOCKS_INCORRECT_FOR_GOLDEN_TOOLS // 金ツールで収集不可能なブロック
MaterialTag.CORALS // サンゴ(ブロック含む)
```

MaterialTagは思いついたら増やします
<br>なんかほしいのあったらissuesにでもどうぞ
<br>~~そもそもこのライブラリ使う人そうそういないと思うけど~~

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

### Material.d.ts
tsで使う用です
<br>jsだけでもjsdocのおかげで型関連の補完は効くのでお好みでどうぞ

## Versions
- 1.21
- 1.21.20
- 1.21.30
- 1.21.41

## License
[MIT LICENSE](/LICENSE)

## Author
Discord: たけのこII | takenoko_4096
<br>Twitter/X: [@Takenoko_4096](https://x.com/Takenoko_4096)
