# Material.js
アイテム・ブロックに関連するデータを格納した単一のクラス

## Usage
Materialクラス, MaterialTagクラスをimportすることで使えます
```js
import { Material, MaterialTag } from "./Material.js";

Material.CARROT; // 人参
```

サンプル: ブロックたたくと勝手に右手に適正ツールが入ります(手抜き)
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

```

書き途中ｪ
