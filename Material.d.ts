// @ts-check
/**
 * @copyright @Takenoko-II 2024
 */

import { ItemType, BlockType, ItemStack, Block, BlockPermutation } from "@minecraft/server";

/**
 * # class {@link MaterialTag}
 * {@link Material.hasTag}などで使えます
 */
export class MaterialTag {
    private constructor();

    /**
     * マテリアルタグを文字列化します。
     */
    public toString(): string;

    /**
     * コンポスターに入れられるアイテム
     */
    public static readonly COMPOSTABLE: MaterialTag;

    /**
     * 食べることができるアイテム
     */
    public static readonly FOODS: MaterialTag;

    /**
     * 固体のブロック
     */
    public static readonly SOLID_BLOCKS: MaterialTag;

    /**
     * レコード
     */
    public static readonly RECORDS: MaterialTag;

    /**
     * エンチャント可能なアイテム
     */
    public static readonly ENCHANTABLE: MaterialTag;

    /**
     * 可燃性を持つブロック
     */
    public static readonly BURNABLE_BLOCKS: MaterialTag;

    /**
     * 燃料になれるアイテム
     */
    public static readonly FUELS: MaterialTag;

    /**
     * 光を通すブロック
     */
    public static readonly LIGHT_PASSABLE_BLOCKS: MaterialTag;

    /**
     * 装備
     */
    public static readonly ARMORS: MaterialTag;

    /**
     * ツール
     */
    public static readonly TOOLS: MaterialTag;

    /**
     * 武器
     */
    public static readonly WEAPONS: MaterialTag;

    /**
     * ピッケルが適正ツールのブロック
     */
    public static readonly MINEABLE_BY_PICKAXE: MaterialTag;

    /**
     * 斧が適正ツールのブロック
     */
    public static readonly MINEABLE_BY_AXE: MaterialTag;

    /**
     * シャベルが適正ツールのブロック
     */
    public static readonly MINEABLE_BY_SHOVEL: MaterialTag;

    /**
     * クワが適正ツールのブロック
     */
    public static readonly MINEABLE_BY_HOE: MaterialTag;

    /**
     * 木材
     */
    public static readonly PLANKS: MaterialTag;

    /**
     * 原木・丸太
     */
    public static readonly LOGS: MaterialTag;

    /**
     * ハーフブロック
     */
    public static readonly SLABS: MaterialTag;

    /**
     * 耐久値を持つアイテム
     */
    public static readonly DAMAGABLE_ITEMS: MaterialTag;

    /**
     * オーバーワールドを構成する主な石
     */
    public static readonly BASE_STONES_OVERWORLD: MaterialTag;

    /**
     * 階段
     */
    public static readonly STAIRS: MaterialTag;

    /**
     * 鍛冶型
     */
    public static readonly ARMOR_TRIM_TEMPLATES: MaterialTag;

    /**
     * アーマートリムの色となる材料
     */
    public static readonly ARMOR_TRIM_MATERIALS: MaterialTag;
    
    /**
     * 葉っぱ
     */
    public static readonly LEAVES: MaterialTag;

    /**
     * カボチャ
     */
    public static readonly PUMPKINS: MaterialTag;

    /**
     * 銅系ブロック
     */
    public static readonly BLOCKS_COPPER: MaterialTag;

    /**
     * 色付きガラス
     */
    public static readonly STAINED_GLASSES: MaterialTag;

    /**
     * 色付きガラス板
     */
    public static readonly STAINED_GLASS_PANES: MaterialTag;

    /**
     * トーチ系
     */
    public static readonly TORCHES: MaterialTag;

    /**
     * 羊毛
     */
    public static readonly WOOLS: MaterialTag;

    /**
     * ビーコンの土台になれるブロック
     */
    public static readonly BEACON_BASE_BLOCKS: MaterialTag;

    /**
     * プルプァ系
     */
    public static readonly BLOCKS_PURPUR: MaterialTag;

    /**
     * トラップドア
     */
    public static readonly TRAPDOORS: MaterialTag;

    /**
     * ドア
     */
    public static readonly DOORS: MaterialTag;

    /**
     * 花
     */
    public static readonly FLOWERS: MaterialTag;

    /**
     * フェンス(ゲートは含まない)
     */
    public static readonly FENCES: MaterialTag;

    /**
     * フェンスゲート
     */
    public static readonly FENCE_GATES: MaterialTag;

    /**
     * コンクリートパウダー
     */
    public static readonly CONCRETE_POWDERS: MaterialTag;

    /**
     * コンクリート
     */
    public static readonly CONCRETES: MaterialTag;

    /**
     * エンティティの落下距離をリセットするブロック
     */
    public static readonly BLOCKS_FALL_DISTANCE_RESETTING: MaterialTag;

    /**
     * ボート
     */
    public static readonly BOATS: MaterialTag;

    /**
     * バケツ
     */
    public static readonly BUCKETS: MaterialTag;

    /**
     * はしごのように登れるブロック
     */
    public static readonly CLIMBABLE_BLOCKS: MaterialTag;

    /**
     * クォーツ系
     */
    public static readonly BLOCKS_QUARTZ: MaterialTag;

    /**
     * アーマートリムを適用可能な防具アイテム
     */
    public static readonly TRIMMABLE_ARMORS: MaterialTag;

    /**
     * スポーンエッグ
     */
    public static readonly SPAWN_EGGS: MaterialTag;

    /**
     * 苗木
     */
    public static readonly SAPLINGS: MaterialTag;

    /**
     * 彩色テラコッタ
     */
    public static readonly GLAZED_TERRACOTTAS: MaterialTag;

    /**
     * 作物
     */
    public static readonly BLOCKS_CROP: MaterialTag;

    /**
     * ネザーを構成する主な石
     */
    public static readonly BASE_STONES_NETHER: MaterialTag;

    /**
     * 壁
     */
    public static readonly WALLS: MaterialTag;

    /**
     * 看板
     */
    public static readonly SIGNS: MaterialTag;

    /**
     * レール
     */
    public static readonly RAILS: MaterialTag;

    /**
     * 感圧版
     */
    public static readonly PRESSURE_PLATES: MaterialTag;

    /**
     * ボタン
     */
    public static readonly BUTTONS: MaterialTag;

    /**
     * 鉱石
     */
    public static readonly ORES: MaterialTag;

    /**
     * テラコッタ
     */
    public static readonly TERRACOTTAS: MaterialTag;

    /**
     * 氷
     */
    public static readonly ICES: MaterialTag;

    /**
     * ヘルメット
     */
    public static readonly HELMETS: MaterialTag;

    /**
     * チェストプレート
     */
    public static readonly CHESTPLATES: MaterialTag;

    /**
     * レギンス
     */
    public static readonly LEGGINGS: MaterialTag;

    /**
     * ブーツ
     */
    public static readonly BOOTS: MaterialTag;

    /**
     * 剣
     */
    public static readonly SWORDS: MaterialTag;

    /**
     * ピッケル
     */
    public static readonly PICKAXES: MaterialTag;

    /**
     * 斧
     */
    public static readonly AXES: MaterialTag;

    /**
     * シャベル
     */
    public static readonly SHOVELS: MaterialTag;

    /**
     * クワ
     */
    public static readonly HOES: MaterialTag;

    /**
     * 木ツール
     */
    public static readonly WOODEN_TOOLS: MaterialTag;

    /**
     * 石ツール
     */
    public static readonly STONE_TOOLS: MaterialTag;

    /**
     * 鉄ツール
     */
    public static readonly IRON_TOOLS: MaterialTag;

    /**
     * 金ツール
     */
    public static readonly GOLDEN_TOOLS: MaterialTag;

    /**
     * ダイヤツール
     */
    public static readonly DIAMOND_TOOLS: MaterialTag;

    /**
     * ネザライトツール
     */
    public static readonly NETHERITE_TOOLS: MaterialTag;

    /**
     * 木ツールで収集不可能なブロック
     */
    public static readonly BLOCKS_INCORRECT_FOR_WOODEN_TOOLS: MaterialTag;

    /**
     * 石ツールで収集不可能なブロック
     */
    public static readonly BLOCKS_INCORRECT_FOR_STONE_TOOLS: MaterialTag;

    /**
     * 鉄ツールで収集不可能なブロック
     */
    public static readonly BLOCKS_INCORRECT_FOR_IRON_TOOLS: MaterialTag;

    /**
     * 金ツールで収集不可能なブロック
     */
    public static readonly BLOCKS_INCORRECT_FOR_GOLDEN_TOOLS: MaterialTag;

    /**
     * サンゴ(ブロック含む)
     */
    public static readonly CORALS: MaterialTag;

    /**
     * 全てのマテリアルタグを配列で返します。
     */
    public static values(): MaterialTag[];
}

/**
 * # class {@link Material}
 * アイテムとブロックの重複する情報を排除したバニラデータ取得のためのクラス
 */
export class Material {
    private constructor();

    /**
     * このマテリアルを@minecraft/server.ItemTypeとして取得します。
     * @throws {TypeError} プロパティ {@link isItem} がtrueでない場合
     */
    public getAsItemType(): ItemType;

    /**
     * このマテリアルを@minecraft/server.BlockTypeとして取得します。
     * @throws {TypeError} プロパティ {@link isBlock} がtrueでない場合
     */
    public getAsBlockType(): BlockType;

    /**
     * このマテリアルがブロックとして存在できるならば真
     */
    public readonly isBlock: boolean;

    /**
     * このマテリアルがアイテムとして存在できるならば真
     */
    public readonly isItem: boolean;

    /**
     * このマテリアルに一致するアイテムスタックであれば真を返します。
     * @throws {TypeError} プロパティ {@link isItem} がtrueでない場合
     * @overload
     */
    public matches(itemStack: ItemStack): boolean;

    /**
     * このマテリアルに一致するブロックであれば真を返します。
     * @throws {TypeError} プロパティ {@link isBlock} がtrueでない場合
     * @overload
     */
    public matches(block: Block): boolean;

    /**
     * このマテリアルに一致するブロック順列であれば真を返します。
     * @throws {TypeError} プロパティ {@link isBlock} がtrueでない場合
     * @overload
     */
    public matches(blockPermutation: BlockPermutation): boolean;

    /**
     * このマテリアルに一致するアイテムタイプであれば真を返します。
     * @throws {TypeError} プロパティ {@link isItem} がtrueでない場合
     * @overload
     */
    public matches(itemType: ItemType): boolean;

    /**
     * このマテリアルに一致するブロックタイプであれば真を返します。
     * @throws {TypeError} プロパティ {@link isBlock} がtrueでない場合
     * @overload
     */
    public matches(blockType: BlockType): boolean;

    /**
     * このマテリアルが保持するブロック状態名を全て取得します。
     * @throws {TypeError} プロパティ {@link isBlock} がtrueでない場合
     */
    public getBlockPropertyNames(): string[];

    /**
     * このマテリアルのアイテムとしての最大スタック数を取得します。
     * @throws {TypeError} プロパティ {@link isItem} がtrueでない場合
     */
    public getItemMaxStackSize(): number;

    /**
     * 指定のマテリアルタグを持っていれば真
     */
    public hasTag(tag: MaterialTag): boolean;

    /**
     * このマテリアルが保持するマテリアルタグを全て取得します。
     */
    public getTags(): MaterialTag[];

    /**
     * @overload
     * ブロックIDまたはアイテムIDを基にマテリアルを取得します。    
     * 存在しなければundefinedを返します。
     */
    public static getMaterial(id: string): Material | undefined;

    /**
     * @overload
     * アイテムを基にマテリアルを取得します。
     */
    public static getMaterial(itemStack: ItemStack): Material;

    /**
     * @overload
     * ブロックを基にマテリアルを取得します。
     */
    public static getMaterial(block: Block): Material;

    /**
     * @overload
     * ブロック順列を基にマテリアルを取得します。
     */
    public static getMaterial(blockPermutation: BlockPermutation): Material;

    /**
     * @overload
     * アイテムタイプを基にマテリアルを取得します。
     * @param {ItemType} itemType
     * @returns {Material}
     */
    public static getMaterial(itemType: ItemType): Material;

    /**
     * @overload
     * ブロックタイプを基にマテリアルを取得します。
     */
    public static getMaterial(blockType: BlockType): Material;

    /**
     * 全てのマテリアルを配列で返します。
     */
    public static values(): Material[];

    /**
     * 渡されたIDに対応する非推奨のマテリアルを返します。    
     * 非推奨のマテリアルはこの関数とプロパティへの直接アクセス以外では取得できません。
     * @deprecated
     */
    public static getDeprecated(id: string): Material | undefined;

    public static readonly ACACIA_BOAT: Material;

    public static readonly ACACIA_BUTTON: Material;

    public static readonly ACACIA_CHEST_BOAT: Material;

    public static readonly ACACIA_DOOR: Material;

    public static readonly ACACIA_FENCE: Material;

    public static readonly ACACIA_FENCE_GATE: Material;

    public static readonly ACACIA_HANGING_SIGN: Material;

    public static readonly ACACIA_LEAVES: Material;

    public static readonly ACACIA_LOG: Material;

    public static readonly ACACIA_PLANKS: Material;

    public static readonly ACACIA_PRESSURE_PLATE: Material;

    public static readonly ACACIA_SAPLING: Material;

    public static readonly ACACIA_SIGN: Material;

    public static readonly ACACIA_SLAB: Material;

    public static readonly ACACIA_STAIRS: Material;

    public static readonly ACACIA_TRAPDOOR: Material;

    public static readonly ACACIA_WOOD: Material;

    public static readonly ACTIVATOR_RAIL: Material;

    public static readonly AIR: Material;

    public static readonly ALLAY_SPAWN_EGG: Material;

    public static readonly ALLIUM: Material;

    public static readonly ALLOW: Material;

    public static readonly AMETHYST_BLOCK: Material;

    public static readonly AMETHYST_CLUSTER: Material;

    public static readonly AMETHYST_SHARD: Material;

    public static readonly ANCIENT_DEBRIS: Material;

    public static readonly ANDESITE: Material;

    public static readonly ANDESITE_STAIRS: Material;

    public static readonly ANGLER_POTTERY_SHERD: Material;

    public static readonly ANVIL: Material;

    public static readonly CHIPPED_ANVIL: Material;

    public static readonly DAMAGED_ANVIL: Material;

    /**
     * @deprecated
     */
    public static readonly DEPRECATED_ANVIL: Material;

    public static readonly APPLE: Material;

    public static readonly ARCHER_POTTERY_SHERD: Material;

    public static readonly ARMADILLO_SCUTE: Material;

    public static readonly ARMADILLO_SPAWN_EGG: Material;

    public static readonly ARMOR_STAND: Material;

    public static readonly ARMS_UP_POTTERY_SHERD: Material;

    public static readonly ARROW: Material;

    public static readonly AXOLOTL_BUCKET: Material;

    public static readonly AXOLOTL_SPAWN_EGG: Material;

    public static readonly AZALEA: Material;

    public static readonly AZALEA_LEAVES: Material;

    public static readonly AZALEA_LEAVES_FLOWERED: Material;

    public static readonly AZURE_BLUET: Material;

    public static readonly BAKED_POTATO: Material;

    public static readonly BAMBOO: Material;

    public static readonly BAMBOO_BLOCK: Material;

    public static readonly BAMBOO_BUTTON: Material;

    public static readonly BAMBOO_CHEST_RAFT: Material;

    public static readonly BAMBOO_DOOR: Material;

    public static readonly BAMBOO_FENCE: Material;

    public static readonly BAMBOO_FENCE_GATE: Material;

    public static readonly BAMBOO_HANGING_SIGN: Material;

    public static readonly BAMBOO_MOSAIC: Material;

    public static readonly BAMBOO_MOSAIC_SLAB: Material;

    public static readonly BAMBOO_MOSAIC_STAIRS: Material;

    public static readonly BAMBOO_PLANKS: Material;

    public static readonly BAMBOO_PRESSURE_PLATE: Material;

    public static readonly BAMBOO_RAFT: Material;

    public static readonly BAMBOO_SIGN: Material;

    public static readonly BAMBOO_SLAB: Material;

    public static readonly BAMBOO_STAIRS: Material;

    public static readonly BAMBOO_TRAPDOOR: Material;

    public static readonly BANNER: Material;

    /**
     * @deprecated
     */
    public static readonly BANNER_PATTERN: Material;

    public static readonly BARREL: Material;

    public static readonly BARRIER: Material;

    public static readonly BASALT: Material;

    public static readonly BAT_SPAWN_EGG: Material;

    public static readonly BEACON: Material;

    public static readonly BED: Material;

    public static readonly BEDROCK: Material;

    public static readonly BEE_NEST: Material;

    public static readonly BEE_SPAWN_EGG: Material;

    public static readonly BEEF: Material;

    public static readonly BEEHIVE: Material;

    public static readonly BEETROOT: Material;

    public static readonly BEETROOT_SEEDS: Material;

    public static readonly BEETROOT_SOUP: Material;

    public static readonly BELL: Material;

    public static readonly BIG_DRIPLEAF: Material;

    public static readonly BIRCH_BOAT: Material;

    public static readonly BIRCH_BUTTON: Material;

    public static readonly BIRCH_CHEST_BOAT: Material;

    public static readonly BIRCH_DOOR: Material;

    public static readonly BIRCH_FENCE: Material;

    public static readonly BIRCH_FENCE_GATE: Material;

    public static readonly BIRCH_HANGING_SIGN: Material;

    public static readonly BIRCH_LEAVES: Material;

    public static readonly BIRCH_LOG: Material;

    public static readonly BIRCH_PLANKS: Material;

    public static readonly BIRCH_PRESSURE_PLATE: Material;

    public static readonly BIRCH_SAPLING: Material;

    public static readonly BIRCH_SIGN: Material;

    public static readonly BIRCH_SLAB: Material;

    public static readonly BIRCH_STAIRS: Material;

    public static readonly BIRCH_TRAPDOOR: Material;

    public static readonly BIRCH_WOOD: Material;

    public static readonly BLACK_CANDLE: Material;

    public static readonly BLACK_CARPET: Material;

    public static readonly BLACK_CONCRETE: Material;

    public static readonly BLACK_CONCRETE_POWDER: Material;

    public static readonly BLACK_DYE: Material;

    public static readonly BLACK_GLAZED_TERRACOTTA: Material;

    public static readonly BLACK_SHULKER_BOX: Material;

    public static readonly BLACK_STAINED_GLASS: Material;

    public static readonly BLACK_STAINED_GLASS_PANE: Material;

    public static readonly BLACK_TERRACOTTA: Material;

    public static readonly BLACK_WOOL: Material;

    public static readonly BLACKSTONE: Material;

    public static readonly BLACKSTONE_SLAB: Material;

    public static readonly BLACKSTONE_STAIRS: Material;

    public static readonly BLACKSTONE_WALL: Material;

    public static readonly BLADE_POTTERY_SHERD: Material;

    public static readonly BLAST_FURNACE: Material;

    public static readonly BLAZE_POWDER: Material;

    public static readonly BLAZE_ROD: Material;

    public static readonly BLAZE_SPAWN_EGG: Material;

    public static readonly BLUE_CANDLE: Material;

    public static readonly BLUE_CARPET: Material;

    public static readonly BLUE_CONCRETE: Material;

    public static readonly BLUE_CONCRETE_POWDER: Material;

    public static readonly BLUE_DYE: Material;

    public static readonly BLUE_GLAZED_TERRACOTTA: Material;

    public static readonly BLUE_ICE: Material;

    public static readonly BLUE_ORCHID: Material;

    public static readonly BLUE_SHULKER_BOX: Material;

    public static readonly BLUE_STAINED_GLASS: Material;

    public static readonly BLUE_STAINED_GLASS_PANE: Material;

    public static readonly BLUE_TERRACOTTA: Material;

    public static readonly BLUE_WOOL: Material;

    /**
     * @deprecated
     */
    public static readonly BOAT: Material;

    public static readonly BOGGED_SPAWN_EGG: Material;

    public static readonly BOLT_ARMOR_TRIM_SMITHING_TEMPLATE: Material;

    public static readonly BONE: Material;

    public static readonly BONE_BLOCK: Material;

    public static readonly BONE_MEAL: Material;

    public static readonly BOOK: Material;

    public static readonly BOOKSHELF: Material;

    public static readonly BORDER_BLOCK: Material;

    public static readonly BORDURE_INDENTED_BANNER_PATTERN: Material;

    public static readonly BOW: Material;

    public static readonly BOWL: Material;

    public static readonly BRAIN_CORAL: Material;

    public static readonly BRAIN_CORAL_BLOCK: Material;

    public static readonly BRAIN_CORAL_FAN: Material;

    public static readonly BREAD: Material;

    public static readonly BREEZE_ROD: Material;

    public static readonly BREEZE_SPAWN_EGG: Material;

    public static readonly BREWER_POTTERY_SHERD: Material;

    public static readonly BREWING_STAND: Material;

    public static readonly BRICK: Material;

    public static readonly BRICK_BLOCK: Material;

    public static readonly BRICK_SLAB: Material;

    public static readonly BRICK_STAIRS: Material;

    public static readonly BROWN_CANDLE: Material;

    public static readonly BROWN_CARPET: Material;

    public static readonly BROWN_CONCRETE: Material;

    public static readonly BROWN_CONCRETE_POWDER: Material;

    public static readonly BROWN_DYE: Material;

    public static readonly BROWN_GLAZED_TERRACOTTA: Material;

    public static readonly BROWN_MUSHROOM: Material;

    public static readonly BROWN_MUSHROOM_BLOCK: Material;

    public static readonly BROWN_SHULKER_BOX: Material;

    public static readonly BROWN_STAINED_GLASS: Material;

    public static readonly BROWN_STAINED_GLASS_PANE: Material;

    public static readonly BROWN_TERRACOTTA: Material;

    public static readonly BROWN_WOOL: Material;

    public static readonly BRUSH: Material;

    public static readonly BUBBLE_CORAL: Material;

    public static readonly BUBBLE_CORAL_BLOCK: Material;

    public static readonly BUBBLE_CORAL_FAN: Material;

    public static readonly BUCKET: Material;

    public static readonly BUDDING_AMETHYST: Material;

    public static readonly BURN_POTTERY_SHERD: Material;

    public static readonly CACTUS: Material;

    public static readonly CAKE: Material;

    public static readonly CALCITE: Material;

    public static readonly CALIBRATED_SCULK_SENSOR: Material;

    public static readonly CAMEL_SPAWN_EGG: Material;

    public static readonly CAMPFIRE: Material;

    public static readonly CANDLE: Material;

    /**
     * @deprecated
     */
    public static readonly CARPET: Material;

    public static readonly CARROT: Material;

    public static readonly CARROT_ON_A_STICK: Material;

    public static readonly CARTOGRAPHY_TABLE: Material;

    public static readonly CARVED_PUMPKIN: Material;

    public static readonly CAT_SPAWN_EGG: Material;

    public static readonly CAULDRON: Material;

    public static readonly CAVE_SPIDER_SPAWN_EGG: Material;

    public static readonly CHAIN: Material;

    public static readonly CHAIN_COMMAND_BLOCK: Material;

    public static readonly CHAINMAIL_BOOTS: Material;

    public static readonly CHAINMAIL_CHESTPLATE: Material;

    public static readonly CHAINMAIL_HELMET: Material;

    public static readonly CHAINMAIL_LEGGINGS: Material;

    public static readonly CHARCOAL: Material;

    public static readonly CHERRY_BOAT: Material;

    public static readonly CHERRY_BUTTON: Material;

    public static readonly CHERRY_CHEST_BOAT: Material;

    public static readonly CHERRY_DOOR: Material;

    public static readonly CHERRY_FENCE: Material;

    public static readonly CHERRY_FENCE_GATE: Material;

    public static readonly CHERRY_HANGING_SIGN: Material;

    public static readonly CHERRY_LEAVES: Material;

    public static readonly CHERRY_LOG: Material;

    public static readonly CHERRY_PLANKS: Material;

    public static readonly CHERRY_PRESSURE_PLATE: Material;

    public static readonly CHERRY_SAPLING: Material;

    public static readonly CHERRY_SIGN: Material;

    public static readonly CHERRY_SLAB: Material;

    public static readonly CHERRY_STAIRS: Material;

    public static readonly CHERRY_TRAPDOOR: Material;

    public static readonly CHERRY_WOOD: Material;

    public static readonly CHEST: Material;

    /**
     * @deprecated
     */
    public static readonly CHEST_BOAT: Material;

    public static readonly CHEST_MINECART: Material;

    public static readonly CHICKEN: Material;

    public static readonly CHICKEN_SPAWN_EGG: Material;

    public static readonly CHISELED_BOOKSHELF: Material;

    public static readonly CHISELED_COPPER: Material;

    public static readonly CHISELED_DEEPSLATE: Material;

    public static readonly CHISELED_NETHER_BRICKS: Material;

    public static readonly CHISELED_POLISHED_BLACKSTONE: Material;

    public static readonly CHISELED_TUFF: Material;

    public static readonly CHISELED_TUFF_BRICKS: Material;

    public static readonly CHORUS_FLOWER: Material;

    public static readonly CHORUS_FRUIT: Material;

    public static readonly CHORUS_PLANT: Material;

    public static readonly CLAY: Material;

    public static readonly CLAY_BALL: Material;

    public static readonly CLOCK: Material;

    public static readonly COAL: Material;

    public static readonly COAL_BLOCK: Material;

    public static readonly COAL_ORE: Material;

    public static readonly COAST_ARMOR_TRIM_SMITHING_TEMPLATE: Material;

    public static readonly COBBLED_DEEPSLATE: Material;

    public static readonly COBBLED_DEEPSLATE_SLAB: Material;

    public static readonly COBBLED_DEEPSLATE_STAIRS: Material;

    public static readonly COBBLED_DEEPSLATE_WALL: Material;

    public static readonly COBBLESTONE: Material;

    public static readonly COBBLESTONE_SLAB: Material;

    public static readonly COBBLESTONE_WALL: Material;

    public static readonly MOSSY_COBBLESTONE_WALL: Material;

    public static readonly GRANITE_WALL: Material;

    public static readonly DIORITE_WALL: Material;

    public static readonly ANDESITE_WALL: Material;

    public static readonly SANDSTONE_WALL: Material;

    public static readonly BRICK_WALL: Material;

    public static readonly STONE_BRICK_WALL: Material;

    public static readonly MOSSY_STONE_BRICK_WALL: Material;

    public static readonly NETHER_BRICK_WALL: Material;

    public static readonly END_STONE_BRICK_WALL: Material;

    public static readonly PRISMARINE_WALL: Material;

    public static readonly RED_SANDSTONE_WALL: Material;

    public static readonly RED_NETHER_BRICK_WALL: Material;

    public static readonly COCOA_BEANS: Material;

    public static readonly COD: Material;

    public static readonly COD_BUCKET: Material;

    public static readonly COD_SPAWN_EGG: Material;

    public static readonly COMMAND_BLOCK: Material;

    public static readonly COMMAND_BLOCK_MINECART: Material;

    public static readonly COMPARATOR: Material;

    public static readonly COMPASS: Material;

    public static readonly COMPOSTER: Material;

    /**
     * @deprecated
     */
    public static readonly CONCRETE: Material;

    /**
     * @deprecated
     */
    public static readonly CONCRETE_POWDER: Material;

    public static readonly CONDUIT: Material;

    public static readonly COOKED_BEEF: Material;

    public static readonly COOKED_CHICKEN: Material;

    public static readonly COOKED_COD: Material;

    public static readonly COOKED_MUTTON: Material;

    public static readonly COOKED_PORKCHOP: Material;

    public static readonly COOKED_RABBIT: Material;

    public static readonly COOKED_SALMON: Material;

    public static readonly COOKIE: Material;

    public static readonly COPPER_BLOCK: Material;

    public static readonly COPPER_BULB: Material;

    public static readonly COPPER_DOOR: Material;

    public static readonly COPPER_GRATE: Material;

    public static readonly COPPER_INGOT: Material;

    public static readonly COPPER_ORE: Material;

    public static readonly COPPER_TRAPDOOR: Material;

    /**
     * @deprecated
     */
    public static readonly CORAL: Material;

    /**
     * @deprecated
     */
    public static readonly CORAL_BLOCK: Material;

    /**
     * @deprecated
     */
    public static readonly CORAL_FAN: Material;

    /**
     * @deprecated
     */
    public static readonly CORAL_FAN_DEAD: Material;

    public static readonly CORNFLOWER: Material;

    public static readonly COW_SPAWN_EGG: Material;

    public static readonly CRACKED_DEEPSLATE_BRICKS: Material;

    public static readonly CRACKED_DEEPSLATE_TILES: Material;

    public static readonly CRACKED_NETHER_BRICKS: Material;

    public static readonly CRACKED_POLISHED_BLACKSTONE_BRICKS: Material;

    public static readonly CRAFTER: Material;

    public static readonly CRAFTING_TABLE: Material;

    public static readonly CREEPER_BANNER_PATTERN: Material;

    public static readonly CREEPER_SPAWN_EGG: Material;

    public static readonly CRIMSON_BUTTON: Material;

    public static readonly CRIMSON_DOOR: Material;

    public static readonly CRIMSON_FENCE: Material;

    public static readonly CRIMSON_FENCE_GATE: Material;

    public static readonly CRIMSON_FUNGUS: Material;

    public static readonly CRIMSON_HANGING_SIGN: Material;

    public static readonly CRIMSON_HYPHAE: Material;

    public static readonly CRIMSON_NYLIUM: Material;

    public static readonly CRIMSON_PLANKS: Material;

    public static readonly CRIMSON_PRESSURE_PLATE: Material;

    public static readonly CRIMSON_ROOTS: Material;

    public static readonly CRIMSON_SIGN: Material;

    public static readonly CRIMSON_SLAB: Material;

    public static readonly CRIMSON_STAIRS: Material;

    public static readonly CRIMSON_STEM: Material;

    public static readonly CRIMSON_TRAPDOOR: Material;

    public static readonly CROSSBOW: Material;

    public static readonly CRYING_OBSIDIAN: Material;

    public static readonly CUT_COPPER: Material;

    public static readonly CUT_COPPER_SLAB: Material;

    public static readonly CUT_COPPER_STAIRS: Material;

    public static readonly CYAN_CANDLE: Material;

    public static readonly CYAN_CARPET: Material;

    public static readonly CYAN_CONCRETE: Material;

    public static readonly CYAN_CONCRETE_POWDER: Material;

    public static readonly CYAN_DYE: Material;

    public static readonly CYAN_GLAZED_TERRACOTTA: Material;

    public static readonly CYAN_SHULKER_BOX: Material;

    public static readonly CYAN_STAINED_GLASS: Material;

    public static readonly CYAN_STAINED_GLASS_PANE: Material;

    public static readonly CYAN_TERRACOTTA: Material;

    public static readonly CYAN_WOOL: Material;

    public static readonly DANGER_POTTERY_SHERD: Material;

    public static readonly DARK_OAK_BOAT: Material;

    public static readonly DARK_OAK_BUTTON: Material;

    public static readonly DARK_OAK_CHEST_BOAT: Material;

    public static readonly DARK_OAK_DOOR: Material;

    public static readonly DARK_OAK_FENCE: Material;

    public static readonly DARK_OAK_FENCE_GATE: Material;

    public static readonly DARK_OAK_HANGING_SIGN: Material;

    public static readonly DARK_OAK_LEAVES: Material;

    public static readonly DARK_OAK_LOG: Material;

    public static readonly DARK_OAK_PLANKS: Material;

    public static readonly DARK_OAK_PRESSURE_PLATE: Material;

    public static readonly DARK_OAK_SAPLING: Material;

    public static readonly DARK_OAK_SIGN: Material;

    public static readonly DARK_OAK_SLAB: Material;

    public static readonly DARK_OAK_STAIRS: Material;

    public static readonly DARK_OAK_TRAPDOOR: Material;

    public static readonly DARK_OAK_WOOD: Material;

    public static readonly DARK_PRISMARINE_STAIRS: Material;

    public static readonly DAYLIGHT_DETECTOR: Material;

    public static readonly DEAD_BRAIN_CORAL: Material;

    public static readonly DEAD_BRAIN_CORAL_BLOCK: Material;

    public static readonly DEAD_BRAIN_CORAL_FAN: Material;

    public static readonly DEAD_BUBBLE_CORAL: Material;

    public static readonly DEAD_BUBBLE_CORAL_BLOCK: Material;

    public static readonly DEAD_BUBBLE_CORAL_FAN: Material;

    public static readonly DEAD_FIRE_CORAL: Material;

    public static readonly DEAD_FIRE_CORAL_BLOCK: Material;

    public static readonly DEAD_FIRE_CORAL_FAN: Material;

    public static readonly DEAD_HORN_CORAL: Material;

    public static readonly DEAD_HORN_CORAL_BLOCK: Material;

    public static readonly DEAD_HORN_CORAL_FAN: Material;

    public static readonly DEAD_TUBE_CORAL: Material;

    public static readonly DEAD_TUBE_CORAL_BLOCK: Material;

    public static readonly DEAD_TUBE_CORAL_FAN: Material;

    public static readonly DEADBUSH: Material;

    public static readonly DECORATED_POT: Material;

    public static readonly DEEPSLATE: Material;

    public static readonly DEEPSLATE_BRICK_SLAB: Material;

    public static readonly DEEPSLATE_BRICK_STAIRS: Material;

    public static readonly DEEPSLATE_BRICK_WALL: Material;

    public static readonly DEEPSLATE_BRICKS: Material;

    public static readonly DEEPSLATE_COAL_ORE: Material;

    public static readonly DEEPSLATE_COPPER_ORE: Material;

    public static readonly DEEPSLATE_DIAMOND_ORE: Material;

    public static readonly DEEPSLATE_EMERALD_ORE: Material;

    public static readonly DEEPSLATE_GOLD_ORE: Material;

    public static readonly DEEPSLATE_IRON_ORE: Material;

    public static readonly DEEPSLATE_LAPIS_ORE: Material;

    public static readonly DEEPSLATE_REDSTONE_ORE: Material;

    public static readonly DEEPSLATE_TILE_SLAB: Material;

    public static readonly DEEPSLATE_TILE_STAIRS: Material;

    public static readonly DEEPSLATE_TILE_WALL: Material;

    public static readonly DEEPSLATE_TILES: Material;

    public static readonly DENY: Material;

    public static readonly DETECTOR_RAIL: Material;

    public static readonly DIAMOND: Material;

    public static readonly DIAMOND_AXE: Material;

    public static readonly DIAMOND_BLOCK: Material;

    public static readonly DIAMOND_BOOTS: Material;

    public static readonly DIAMOND_CHESTPLATE: Material;

    public static readonly DIAMOND_HELMET: Material;

    public static readonly DIAMOND_HOE: Material;

    public static readonly DIAMOND_HORSE_ARMOR: Material;

    public static readonly DIAMOND_LEGGINGS: Material;

    public static readonly DIAMOND_ORE: Material;

    public static readonly DIAMOND_PICKAXE: Material;

    public static readonly DIAMOND_SHOVEL: Material;

    public static readonly DIAMOND_SWORD: Material;

    public static readonly DIORITE: Material;

    public static readonly DIORITE_STAIRS: Material;

    public static readonly DIRT: Material;

    public static readonly COARSE_DIRT: Material;

    public static readonly DIRT_WITH_ROOTS: Material;

    public static readonly DISC_FRAGMENT_5: Material;

    public static readonly DISPENSER: Material;

    public static readonly DOLPHIN_SPAWN_EGG: Material;

    public static readonly DONKEY_SPAWN_EGG: Material;

    /**
     * @deprecated
     */
    public static readonly DOUBLE_PLANT: Material;

    public static readonly DRAGON_BREATH: Material;

    public static readonly DRAGON_EGG: Material;

    public static readonly DRIED_KELP: Material;

    public static readonly DRIED_KELP_BLOCK: Material;

    public static readonly DRIPSTONE_BLOCK: Material;

    public static readonly DROPPER: Material;

    public static readonly DROWNED_SPAWN_EGG: Material;

    public static readonly DUNE_ARMOR_TRIM_SMITHING_TEMPLATE: Material;

    /**
     * @deprecated
     */
    public static readonly DYE: Material;

    public static readonly ECHO_SHARD: Material;

    public static readonly EGG: Material;

    public static readonly ELDER_GUARDIAN_SPAWN_EGG: Material;

    public static readonly ELYTRA: Material;

    public static readonly EMERALD: Material;

    public static readonly EMERALD_BLOCK: Material;

    public static readonly EMERALD_ORE: Material;

    public static readonly EMPTY_MAP: Material;

    public static readonly ENCHANTED_BOOK: Material;

    public static readonly ENCHANTED_GOLDEN_APPLE: Material;

    public static readonly ENCHANTING_TABLE: Material;

    public static readonly END_BRICK_STAIRS: Material;

    public static readonly END_BRICKS: Material;

    public static readonly END_CRYSTAL: Material;

    public static readonly END_PORTAL_FRAME: Material;

    public static readonly END_ROD: Material;

    public static readonly END_STONE: Material;

    public static readonly ENDER_CHEST: Material;

    public static readonly ENDER_DRAGON_SPAWN_EGG: Material;

    public static readonly ENDER_EYE: Material;

    public static readonly ENDER_PEARL: Material;

    public static readonly ENDERMAN_SPAWN_EGG: Material;

    public static readonly ENDERMITE_SPAWN_EGG: Material;

    public static readonly EVOKER_SPAWN_EGG: Material;

    public static readonly EXPERIENCE_BOTTLE: Material;

    public static readonly EXPLORER_POTTERY_SHERD: Material;

    public static readonly EXPOSED_CHISELED_COPPER: Material;

    public static readonly EXPOSED_COPPER: Material;

    public static readonly EXPOSED_COPPER_BULB: Material;

    public static readonly EXPOSED_COPPER_DOOR: Material;

    public static readonly EXPOSED_COPPER_GRATE: Material;

    public static readonly EXPOSED_COPPER_TRAPDOOR: Material;

    public static readonly EXPOSED_CUT_COPPER: Material;

    public static readonly EXPOSED_CUT_COPPER_SLAB: Material;

    public static readonly EXPOSED_CUT_COPPER_STAIRS: Material;

    public static readonly EYE_ARMOR_TRIM_SMITHING_TEMPLATE: Material;

    public static readonly FARMLAND: Material;

    public static readonly FEATHER: Material;

    /**
     * @deprecated
     */
    public static readonly FENCE: Material;

    public static readonly FENCE_GATE: Material;

    public static readonly FERMENTED_SPIDER_EYE: Material;

    public static readonly FERN: Material;

    public static readonly FIELD_MASONED_BANNER_PATTERN: Material;

    public static readonly FILLED_MAP: Material;

    public static readonly FIRE_CHARGE: Material;

    public static readonly FIRE_CORAL: Material;

    public static readonly FIRE_CORAL_BLOCK: Material;

    public static readonly FIRE_CORAL_FAN: Material;

    public static readonly FIREWORK_ROCKET: Material;

    public static readonly FIREWORK_STAR: Material;

    public static readonly FISHING_ROD: Material;

    public static readonly FLETCHING_TABLE: Material;

    public static readonly FLINT: Material;

    public static readonly FLINT_AND_STEEL: Material;

    public static readonly FLOW_ARMOR_TRIM_SMITHING_TEMPLATE: Material;

    public static readonly FLOW_BANNER_PATTERN: Material;

    public static readonly FLOW_POTTERY_SHERD: Material;

    public static readonly FLOWER_BANNER_PATTERN: Material;

    public static readonly FLOWER_POT: Material;

    public static readonly FLOWERING_AZALEA: Material;

    public static readonly FOX_SPAWN_EGG: Material;

    public static readonly FRAME: Material;

    public static readonly FRIEND_POTTERY_SHERD: Material;

    public static readonly FROG_SPAWN: Material;

    public static readonly FROG_SPAWN_EGG: Material;

    public static readonly FROSTED_ICE: Material;

    public static readonly FURNACE: Material;

    public static readonly GHAST_SPAWN_EGG: Material;

    public static readonly GHAST_TEAR: Material;

    public static readonly GILDED_BLACKSTONE: Material;

    public static readonly GLASS: Material;

    public static readonly GLASS_BOTTLE: Material;

    public static readonly GLASS_PANE: Material;

    public static readonly GLISTERING_MELON_SLICE: Material;

    public static readonly GLOBE_BANNER_PATTERN: Material;

    public static readonly GLOW_BERRIES: Material;

    public static readonly GLOW_FRAME: Material;

    public static readonly GLOW_INK_SAC: Material;

    public static readonly GLOW_LICHEN: Material;

    public static readonly GLOW_SQUID_SPAWN_EGG: Material;

    public static readonly GLOWSTONE: Material;

    public static readonly GLOWSTONE_DUST: Material;

    public static readonly GOAT_HORN: Material;

    public static readonly GOAT_SPAWN_EGG: Material;

    public static readonly GOLD_BLOCK: Material;

    public static readonly GOLD_INGOT: Material;

    public static readonly GOLD_NUGGET: Material;

    public static readonly GOLD_ORE: Material;

    public static readonly GOLDEN_APPLE: Material;

    public static readonly GOLDEN_AXE: Material;

    public static readonly GOLDEN_BOOTS: Material;

    public static readonly GOLDEN_CARROT: Material;

    public static readonly GOLDEN_CHESTPLATE: Material;

    public static readonly GOLDEN_HELMET: Material;

    public static readonly GOLDEN_HOE: Material;

    public static readonly GOLDEN_HORSE_ARMOR: Material;

    public static readonly GOLDEN_LEGGINGS: Material;

    public static readonly GOLDEN_PICKAXE: Material;

    public static readonly GOLDEN_RAIL: Material;

    public static readonly GOLDEN_SHOVEL: Material;

    public static readonly GOLDEN_SWORD: Material;

    public static readonly GRANITE: Material;

    public static readonly GRANITE_STAIRS: Material;

    public static readonly GRASS_BLOCK: Material;

    public static readonly GRASS_PATH: Material;

    public static readonly GRAVEL: Material;

    public static readonly GRAY_CANDLE: Material;

    public static readonly GRAY_CARPET: Material;

    public static readonly GRAY_CONCRETE: Material;

    public static readonly GRAY_CONCRETE_POWDER: Material;

    public static readonly GRAY_DYE: Material;

    public static readonly GRAY_GLAZED_TERRACOTTA: Material;

    public static readonly GRAY_SHULKER_BOX: Material;

    public static readonly GRAY_STAINED_GLASS: Material;

    public static readonly GRAY_STAINED_GLASS_PANE: Material;

    public static readonly GRAY_TERRACOTTA: Material;

    public static readonly GRAY_WOOL: Material;

    public static readonly GREEN_CANDLE: Material;

    public static readonly GREEN_CARPET: Material;

    public static readonly GREEN_CONCRETE: Material;

    public static readonly GREEN_CONCRETE_POWDER: Material;

    public static readonly GREEN_DYE: Material;

    public static readonly GREEN_GLAZED_TERRACOTTA: Material;

    public static readonly GREEN_SHULKER_BOX: Material;

    public static readonly GREEN_STAINED_GLASS: Material;

    public static readonly GREEN_STAINED_GLASS_PANE: Material;

    public static readonly GREEN_TERRACOTTA: Material;

    public static readonly GREEN_WOOL: Material;

    public static readonly GRINDSTONE: Material;

    public static readonly GUARDIAN_SPAWN_EGG: Material;

    public static readonly GUNPOWDER: Material;

    public static readonly GUSTER_BANNER_PATTERN: Material;

    public static readonly GUSTER_POTTERY_SHERD: Material;

    public static readonly HANGING_ROOTS: Material;

    /**
     * @deprecated
     */
    public static readonly HARD_STAINED_GLASS: Material;

    /**
     * @deprecated
     */
    public static readonly HARD_STAINED_GLASS_PANE: Material;

    public static readonly HARDENED_CLAY: Material;

    public static readonly HAY_BLOCK: Material;

    public static readonly HEART_OF_THE_SEA: Material;

    public static readonly HEART_POTTERY_SHERD: Material;

    public static readonly HEARTBREAK_POTTERY_SHERD: Material;

    public static readonly HEAVY_CORE: Material;

    public static readonly HEAVY_WEIGHTED_PRESSURE_PLATE: Material;

    public static readonly HOGLIN_SPAWN_EGG: Material;

    public static readonly HONEY_BLOCK: Material;

    public static readonly HONEY_BOTTLE: Material;

    public static readonly HONEYCOMB: Material;

    public static readonly HONEYCOMB_BLOCK: Material;

    public static readonly HOPPER: Material;

    public static readonly HOPPER_MINECART: Material;

    public static readonly HORN_CORAL: Material;

    public static readonly HORN_CORAL_BLOCK: Material;

    public static readonly HORN_CORAL_FAN: Material;

    public static readonly HORSE_SPAWN_EGG: Material;

    public static readonly HOST_ARMOR_TRIM_SMITHING_TEMPLATE: Material;

    public static readonly HOWL_POTTERY_SHERD: Material;

    public static readonly HUSK_SPAWN_EGG: Material;

    public static readonly ICE: Material;

    public static readonly INFESTED_DEEPSLATE: Material;

    public static readonly INK_SAC: Material;

    public static readonly IRON_AXE: Material;

    public static readonly IRON_BARS: Material;

    public static readonly IRON_BLOCK: Material;

    public static readonly IRON_BOOTS: Material;

    public static readonly IRON_CHESTPLATE: Material;

    public static readonly IRON_DOOR: Material;

    public static readonly IRON_GOLEM_SPAWN_EGG: Material;

    public static readonly IRON_HELMET: Material;

    public static readonly IRON_HOE: Material;

    public static readonly IRON_HORSE_ARMOR: Material;

    public static readonly IRON_INGOT: Material;

    public static readonly IRON_LEGGINGS: Material;

    public static readonly IRON_NUGGET: Material;

    public static readonly IRON_ORE: Material;

    public static readonly IRON_PICKAXE: Material;

    public static readonly IRON_SHOVEL: Material;

    public static readonly IRON_SWORD: Material;

    public static readonly IRON_TRAPDOOR: Material;

    public static readonly JIGSAW: Material;

    public static readonly JUKEBOX: Material;

    public static readonly JUNGLE_BOAT: Material;

    public static readonly JUNGLE_BUTTON: Material;

    public static readonly JUNGLE_CHEST_BOAT: Material;

    public static readonly JUNGLE_DOOR: Material;

    public static readonly JUNGLE_FENCE: Material;

    public static readonly JUNGLE_FENCE_GATE: Material;

    public static readonly JUNGLE_HANGING_SIGN: Material;

    public static readonly JUNGLE_LEAVES: Material;

    public static readonly JUNGLE_LOG: Material;

    public static readonly JUNGLE_PLANKS: Material;

    public static readonly JUNGLE_PRESSURE_PLATE: Material;

    public static readonly JUNGLE_SAPLING: Material;

    public static readonly JUNGLE_SIGN: Material;

    public static readonly JUNGLE_SLAB: Material;

    public static readonly JUNGLE_STAIRS: Material;

    public static readonly JUNGLE_TRAPDOOR: Material;

    public static readonly JUNGLE_WOOD: Material;

    public static readonly KELP: Material;

    public static readonly LADDER: Material;

    public static readonly LANTERN: Material;

    public static readonly LAPIS_BLOCK: Material;

    public static readonly LAPIS_LAZULI: Material;

    public static readonly LAPIS_ORE: Material;

    public static readonly LARGE_AMETHYST_BUD: Material;

    public static readonly LARGE_FERN: Material;

    public static readonly LAVA_BUCKET: Material;

    public static readonly LEAD: Material;

    public static readonly LEATHER: Material;

    public static readonly LEATHER_BOOTS: Material;

    public static readonly LEATHER_CHESTPLATE: Material;

    public static readonly LEATHER_HELMET: Material;

    public static readonly LEATHER_HORSE_ARMOR: Material;

    public static readonly LEATHER_LEGGINGS: Material;

    /**
     * @deprecated
     */
    public static readonly LEAVES: Material;

    /**
     * @deprecated
     */
    public static readonly LEAVES2: Material;

    public static readonly LECTERN: Material;

    public static readonly LEVER: Material;

    /**
     * なんかアイテムの方のlight_blockが廃止されてないからdeprecated付けようにも付けられないんだけど
     */
    public static readonly LIGHT_BLOCK: Material;

    public static readonly LIGHT_BLOCK_0: Material;

    public static readonly LIGHT_BLOCK_1: Material;

    public static readonly LIGHT_BLOCK_2: Material;

    public static readonly LIGHT_BLOCK_3: Material;

    public static readonly LIGHT_BLOCK_4: Material;

    public static readonly LIGHT_BLOCK_5: Material;

    public static readonly LIGHT_BLOCK_6: Material;

    public static readonly LIGHT_BLOCK_7: Material;

    public static readonly LIGHT_BLOCK_8: Material;

    public static readonly LIGHT_BLOCK_9: Material;

    public static readonly LIGHT_BLOCK_10: Material;

    public static readonly LIGHT_BLOCK_11: Material;

    public static readonly LIGHT_BLOCK_12: Material;

    public static readonly LIGHT_BLOCK_13: Material;

    public static readonly LIGHT_BLOCK_14: Material;

    public static readonly LIGHT_BLOCK_15: Material;

    public static readonly LIGHT_BLUE_CANDLE: Material;

    public static readonly LIGHT_BLUE_CARPET: Material;

    public static readonly LIGHT_BLUE_CONCRETE: Material;

    public static readonly LIGHT_BLUE_CONCRETE_POWDER: Material;

    public static readonly LIGHT_BLUE_DYE: Material;

    public static readonly LIGHT_BLUE_GLAZED_TERRACOTTA: Material;

    public static readonly LIGHT_BLUE_SHULKER_BOX: Material;

    public static readonly LIGHT_BLUE_STAINED_GLASS: Material;

    public static readonly LIGHT_BLUE_STAINED_GLASS_PANE: Material;

    public static readonly LIGHT_BLUE_TERRACOTTA: Material;

    public static readonly LIGHT_BLUE_WOOL: Material;

    public static readonly LIGHT_GRAY_CANDLE: Material;

    public static readonly LIGHT_GRAY_CARPET: Material;

    public static readonly LIGHT_GRAY_CONCRETE: Material;

    public static readonly LIGHT_GRAY_CONCRETE_POWDER: Material;

    public static readonly LIGHT_GRAY_DYE: Material;

    public static readonly LIGHT_GRAY_SHULKER_BOX: Material;

    public static readonly LIGHT_GRAY_STAINED_GLASS: Material;

    public static readonly LIGHT_GRAY_STAINED_GLASS_PANE: Material;

    public static readonly LIGHT_GRAY_TERRACOTTA: Material;

    public static readonly LIGHT_GRAY_WOOL: Material;

    public static readonly LIGHT_WEIGHTED_PRESSURE_PLATE: Material;

    public static readonly LIGHTNING_ROD: Material;

    public static readonly LILAC: Material;

    public static readonly LILY_OF_THE_VALLEY: Material;

    public static readonly LIME_CANDLE: Material;

    public static readonly LIME_CARPET: Material;

    public static readonly LIME_CONCRETE: Material;

    public static readonly LIME_CONCRETE_POWDER: Material;

    public static readonly LIME_DYE: Material;

    public static readonly LIME_GLAZED_TERRACOTTA: Material;

    public static readonly LIME_SHULKER_BOX: Material;

    public static readonly LIME_STAINED_GLASS: Material;

    public static readonly LIME_STAINED_GLASS_PANE: Material;

    public static readonly LIME_TERRACOTTA: Material;

    public static readonly LIME_WOOL: Material;

    public static readonly LINGERING_POTION: Material;

    public static readonly LIT_PUMPKIN: Material;

    public static readonly LLAMA_SPAWN_EGG: Material;

    public static readonly LODESTONE: Material;

    public static readonly LODESTONE_COMPASS: Material;

    /**
     * @deprecated
     */
    public static readonly LOG: Material;

    /**
     * @deprecated
     */
    public static readonly LOG2: Material;

    public static readonly LOOM: Material;

    public static readonly MACE: Material;

    public static readonly MAGENTA_CANDLE: Material;

    public static readonly MAGENTA_CARPET: Material;

    public static readonly MAGENTA_CONCRETE: Material;

    public static readonly MAGENTA_CONCRETE_POWDER: Material;

    public static readonly MAGENTA_DYE: Material;

    public static readonly MAGENTA_GLAZED_TERRACOTTA: Material;

    public static readonly MAGENTA_SHULKER_BOX: Material;

    public static readonly MAGENTA_STAINED_GLASS: Material;

    public static readonly MAGENTA_STAINED_GLASS_PANE: Material;

    public static readonly MAGENTA_TERRACOTTA: Material;

    public static readonly MAGENTA_WOOL: Material;

    public static readonly MAGMA: Material;

    public static readonly MAGMA_CREAM: Material;

    public static readonly MAGMA_CUBE_SPAWN_EGG: Material;

    public static readonly MANGROVE_BOAT: Material;

    public static readonly MANGROVE_BUTTON: Material;

    public static readonly MANGROVE_CHEST_BOAT: Material;

    public static readonly MANGROVE_DOOR: Material;

    public static readonly MANGROVE_FENCE: Material;

    public static readonly MANGROVE_FENCE_GATE: Material;

    public static readonly MANGROVE_HANGING_SIGN: Material;

    public static readonly MANGROVE_LEAVES: Material;

    public static readonly MANGROVE_LOG: Material;

    public static readonly MANGROVE_PLANKS: Material;

    public static readonly MANGROVE_PRESSURE_PLATE: Material;

    public static readonly MANGROVE_PROPAGULE: Material;

    public static readonly MANGROVE_ROOTS: Material;

    public static readonly MANGROVE_SIGN: Material;

    public static readonly MANGROVE_SLAB: Material;

    public static readonly MANGROVE_STAIRS: Material;

    public static readonly MANGROVE_TRAPDOOR: Material;

    public static readonly MANGROVE_WOOD: Material;

    public static readonly MEDIUM_AMETHYST_BUD: Material;

    public static readonly MELON_BLOCK: Material;

    public static readonly MELON_SEEDS: Material;

    public static readonly MELON_SLICE: Material;

    public static readonly MILK_BUCKET: Material;

    public static readonly MINECART: Material;

    public static readonly MINER_POTTERY_SHERD: Material;

    public static readonly MOB_SPAWNER: Material;

    public static readonly MOJANG_BANNER_PATTERN: Material;

    /**
     * @deprecated
     */
    public static readonly MONSTER_EGG: Material;

    public static readonly INFESTED_STONE: Material;

    public static readonly INFESTED_COBBLESTONE: Material;

    public static readonly INFESTED_STONE_BRICKS: Material;

    public static readonly INFESTED_MOSSY_STONE_BRICKS: Material;

    public static readonly INFESTED_CRACKED_STONE_BRICKS: Material;

    public static readonly INFESTED_CHISELED_STONE_BRICKS: Material;

    public static readonly MOOSHROOM_SPAWN_EGG: Material;

    public static readonly MOSS_BLOCK: Material;

    public static readonly MOSS_CARPET: Material;

    public static readonly MOSSY_COBBLESTONE: Material;

    public static readonly MOSSY_COBBLESTONE_STAIRS: Material;

    public static readonly MOSSY_STONE_BRICK_STAIRS: Material;

    public static readonly MOURNER_POTTERY_SHERD: Material;

    public static readonly MUD: Material;

    public static readonly MUD_BRICK_SLAB: Material;

    public static readonly MUD_BRICK_STAIRS: Material;

    public static readonly MUD_BRICK_WALL: Material;

    public static readonly MUD_BRICKS: Material;

    public static readonly MUDDY_MANGROVE_ROOTS: Material;

    public static readonly MULE_SPAWN_EGG: Material;

    public static readonly MUSHROOM_STEW: Material;

    public static readonly MUSIC_DISC_11: Material;

    public static readonly MUSIC_DISC_13: Material;

    public static readonly MUSIC_DISC_5: Material;

    public static readonly MUSIC_DISC_BLOCKS: Material;

    public static readonly MUSIC_DISC_CAT: Material;

    public static readonly MUSIC_DISC_CHIRP: Material;

    public static readonly MUSIC_DISC_CREATOR: Material;

    public static readonly MUSIC_DISC_CREATOR_MUSIC_BOX: Material;

    public static readonly MUSIC_DISC_FAR: Material;

    public static readonly MUSIC_DISC_MALL: Material;

    public static readonly MUSIC_DISC_MELLOHI: Material;

    public static readonly MUSIC_DISC_OTHERSIDE: Material;

    public static readonly MUSIC_DISC_PIGSTEP: Material;

    public static readonly MUSIC_DISC_PRECIPICE: Material;

    public static readonly MUSIC_DISC_RELIC: Material;

    public static readonly MUSIC_DISC_STAL: Material;

    public static readonly MUSIC_DISC_STRAD: Material;

    public static readonly MUSIC_DISC_WAIT: Material;

    public static readonly MUSIC_DISC_WARD: Material;

    public static readonly MUTTON: Material;

    public static readonly MYCELIUM: Material;

    public static readonly NAME_TAG: Material;

    public static readonly NAUTILUS_SHELL: Material;

    public static readonly NETHER_BRICK: Material;

    public static readonly NETHER_BRICK_FENCE: Material;

    public static readonly NETHER_BRICK_SLAB: Material;

    public static readonly NETHER_BRICK_STAIRS: Material;

    public static readonly NETHER_GOLD_ORE: Material;

    public static readonly NETHER_SPROUTS: Material;

    public static readonly NETHER_STAR: Material;

    public static readonly NETHER_WART: Material;

    public static readonly NETHER_WART_BLOCK: Material;

    public static readonly NETHERBRICK: Material;

    public static readonly NETHERITE_AXE: Material;

    public static readonly NETHERITE_BLOCK: Material;

    public static readonly NETHERITE_BOOTS: Material;

    public static readonly NETHERITE_CHESTPLATE: Material;

    public static readonly NETHERITE_HELMET: Material;

    public static readonly NETHERITE_HOE: Material;

    public static readonly NETHERITE_INGOT: Material;

    public static readonly NETHERITE_LEGGINGS: Material;

    public static readonly NETHERITE_PICKAXE: Material;

    public static readonly NETHERITE_SCRAP: Material;

    public static readonly NETHERITE_SHOVEL: Material;

    public static readonly NETHERITE_SWORD: Material;

    public static readonly NETHERITE_UPGRADE_SMITHING_TEMPLATE: Material;

    public static readonly NETHERRACK: Material;

    public static readonly NORMAL_STONE_STAIRS: Material;

    public static readonly NOTEBLOCK: Material;

    public static readonly OAK_BOAT: Material;

    public static readonly OAK_CHEST_BOAT: Material;

    public static readonly OAK_FENCE: Material;

    public static readonly OAK_HANGING_SIGN: Material;

    public static readonly OAK_LEAVES: Material;

    public static readonly OAK_LOG: Material;

    public static readonly OAK_PLANKS: Material;

    public static readonly OAK_SAPLING: Material;

    public static readonly OAK_SIGN: Material;

    public static readonly OAK_SLAB: Material;

    public static readonly OAK_STAIRS: Material;

    public static readonly OAK_WOOD: Material;

    public static readonly OBSERVER: Material;

    public static readonly OBSIDIAN: Material;

    public static readonly OCELOT_SPAWN_EGG: Material;

    public static readonly OCHRE_FROGLIGHT: Material;

    public static readonly OMINOUS_BOTTLE: Material;

    public static readonly OMINOUS_TRIAL_KEY: Material;

    public static readonly ORANGE_CANDLE: Material;

    public static readonly ORANGE_CARPET: Material;

    public static readonly ORANGE_CONCRETE: Material;

    public static readonly ORANGE_CONCRETE_POWDER: Material;

    public static readonly ORANGE_DYE: Material;

    public static readonly ORANGE_GLAZED_TERRACOTTA: Material;

    public static readonly ORANGE_SHULKER_BOX: Material;

    public static readonly ORANGE_STAINED_GLASS: Material;

    public static readonly ORANGE_STAINED_GLASS_PANE: Material;

    public static readonly ORANGE_TERRACOTTA: Material;

    public static readonly ORANGE_TULIP: Material;

    public static readonly ORANGE_WOOL: Material;

    public static readonly OXEYE_DAISY: Material;

    public static readonly OXIDIZED_CHISELED_COPPER: Material;

    public static readonly OXIDIZED_COPPER: Material;

    public static readonly OXIDIZED_COPPER_BULB: Material;

    public static readonly OXIDIZED_COPPER_DOOR: Material;

    public static readonly OXIDIZED_COPPER_GRATE: Material;

    public static readonly OXIDIZED_COPPER_TRAPDOOR: Material;

    public static readonly OXIDIZED_CUT_COPPER: Material;

    public static readonly OXIDIZED_CUT_COPPER_SLAB: Material;

    public static readonly OXIDIZED_CUT_COPPER_STAIRS: Material;

    public static readonly PACKED_ICE: Material;

    public static readonly PACKED_MUD: Material;

    public static readonly PAINTING: Material;

    public static readonly PANDA_SPAWN_EGG: Material;

    public static readonly PAPER: Material;

    public static readonly PARROT_SPAWN_EGG: Material;

    public static readonly PEARLESCENT_FROGLIGHT: Material;

    public static readonly PEONY: Material;

    public static readonly PETRIFIED_OAK_SLAB: Material;

    public static readonly PHANTOM_MEMBRANE: Material;

    public static readonly PHANTOM_SPAWN_EGG: Material;

    public static readonly PIG_SPAWN_EGG: Material;

    public static readonly PIGLIN_BANNER_PATTERN: Material;

    public static readonly PIGLIN_BRUTE_SPAWN_EGG: Material;

    public static readonly PIGLIN_SPAWN_EGG: Material;

    public static readonly PILLAGER_SPAWN_EGG: Material;

    public static readonly PINK_CANDLE: Material;

    public static readonly PINK_CARPET: Material;

    public static readonly PINK_CONCRETE: Material;

    public static readonly PINK_CONCRETE_POWDER: Material;

    public static readonly PINK_DYE: Material;

    public static readonly PINK_GLAZED_TERRACOTTA: Material;

    public static readonly PINK_PETALS: Material;

    public static readonly PINK_SHULKER_BOX: Material;

    public static readonly PINK_STAINED_GLASS: Material;

    public static readonly PINK_STAINED_GLASS_PANE: Material;

    public static readonly PINK_TERRACOTTA: Material;

    public static readonly PINK_TULIP: Material;

    public static readonly PINK_WOOL: Material;

    public static readonly PISTON: Material;

    public static readonly PITCHER_PLANT: Material;

    public static readonly PITCHER_POD: Material;

    /**
     * @deprecated
     */
    public static readonly PLANKS: Material;

    public static readonly PLENTY_POTTERY_SHERD: Material;

    public static readonly PODZOL: Material;

    public static readonly POINTED_DRIPSTONE: Material;

    public static readonly POISONOUS_POTATO: Material;

    public static readonly POLAR_BEAR_SPAWN_EGG: Material;

    public static readonly POLISHED_ANDESITE: Material;

    public static readonly POLISHED_ANDESITE_STAIRS: Material;

    public static readonly POLISHED_BASALT: Material;

    public static readonly POLISHED_BLACKSTONE: Material;

    public static readonly POLISHED_BLACKSTONE_BRICK_SLAB: Material;

    public static readonly POLISHED_BLACKSTONE_BRICK_STAIRS: Material;

    public static readonly POLISHED_BLACKSTONE_BRICK_WALL: Material;

    public static readonly POLISHED_BLACKSTONE_BRICKS: Material;

    public static readonly POLISHED_BLACKSTONE_BUTTON: Material;

    public static readonly POLISHED_BLACKSTONE_PRESSURE_PLATE: Material;

    public static readonly POLISHED_BLACKSTONE_SLAB: Material;

    public static readonly POLISHED_BLACKSTONE_STAIRS: Material;

    public static readonly POLISHED_BLACKSTONE_WALL: Material;

    public static readonly POLISHED_DEEPSLATE: Material;

    public static readonly POLISHED_DEEPSLATE_SLAB: Material;

    public static readonly POLISHED_DEEPSLATE_STAIRS: Material;

    public static readonly POLISHED_DEEPSLATE_WALL: Material;

    public static readonly POLISHED_DIORITE: Material;

    public static readonly POLISHED_DIORITE_STAIRS: Material;

    public static readonly POLISHED_GRANITE: Material;

    public static readonly POLISHED_GRANITE_STAIRS: Material;

    public static readonly POLISHED_TUFF: Material;

    public static readonly POLISHED_TUFF_SLAB: Material;

    public static readonly POLISHED_TUFF_STAIRS: Material;

    public static readonly POLISHED_TUFF_WALL: Material;

    public static readonly POPPED_CHORUS_FRUIT: Material;

    public static readonly POPPY: Material;

    public static readonly PORKCHOP: Material;

    public static readonly POTATO: Material;

    public static readonly POTION: Material;

    public static readonly POWDER_SNOW_BUCKET: Material;

    public static readonly PRISMARINE: Material;

    public static readonly DARK_PRISMARINE: Material;

    public static readonly PRISMARINE_BRICKS: Material;

    public static readonly PRISMARINE_BRICKS_STAIRS: Material;

    public static readonly PRISMARINE_CRYSTALS: Material;

    public static readonly PRISMARINE_SHARD: Material;

    public static readonly PRISMARINE_STAIRS: Material;

    public static readonly PRIZE_POTTERY_SHERD: Material;

    public static readonly PUFFERFISH: Material;

    public static readonly PUFFERFISH_BUCKET: Material;

    public static readonly PUFFERFISH_SPAWN_EGG: Material;

    public static readonly PUMPKIN: Material;

    public static readonly PUMPKIN_PIE: Material;

    public static readonly PUMPKIN_SEEDS: Material;

    public static readonly PURPLE_CANDLE: Material;

    public static readonly PURPLE_CARPET: Material;

    public static readonly PURPLE_CONCRETE: Material;

    public static readonly PURPLE_CONCRETE_POWDER: Material;

    public static readonly PURPLE_DYE: Material;

    public static readonly PURPLE_GLAZED_TERRACOTTA: Material;

    public static readonly PURPLE_SHULKER_BOX: Material;

    public static readonly PURPLE_STAINED_GLASS: Material;

    public static readonly PURPLE_STAINED_GLASS_PANE: Material;

    public static readonly PURPLE_TERRACOTTA: Material;

    public static readonly PURPLE_WOOL: Material;

    public static readonly PURPUR_BLOCK: Material;

    public static readonly PURPUR_STAIRS: Material;

    public static readonly QUARTZ: Material;

    public static readonly QUARTZ_BLOCK: Material;

    public static readonly CHISELED_QUARTZ_BLOCK: Material;

    public static readonly QUARTZ_PILLAR: Material;

    public static readonly SMOOTH_QUARTZ: Material;

    public static readonly QUARTZ_BRICKS: Material;

    public static readonly QUARTZ_ORE: Material;

    public static readonly QUARTZ_SLAB: Material;

    public static readonly QUARTZ_STAIRS: Material;

    public static readonly RABBIT: Material;

    public static readonly RABBIT_FOOT: Material;

    public static readonly RABBIT_HIDE: Material;

    public static readonly RABBIT_SPAWN_EGG: Material;

    public static readonly RABBIT_STEW: Material;

    public static readonly RAIL: Material;

    public static readonly RAISER_ARMOR_TRIM_SMITHING_TEMPLATE: Material;

    public static readonly RAVAGER_SPAWN_EGG: Material;

    public static readonly RAW_COPPER: Material;

    public static readonly RAW_COPPER_BLOCK: Material;

    public static readonly RAW_GOLD: Material;

    public static readonly RAW_GOLD_BLOCK: Material;

    public static readonly RAW_IRON: Material;

    public static readonly RAW_IRON_BLOCK: Material;

    public static readonly RECOVERY_COMPASS: Material;

    public static readonly RED_CANDLE: Material;

    public static readonly RED_CARPET: Material;

    public static readonly RED_CONCRETE: Material;

    public static readonly RED_CONCRETE_POWDER: Material;

    public static readonly RED_DYE: Material;

    /**
     * @deprecated
     */
    public static readonly RED_FLOWER: Material;

    public static readonly RED_GLAZED_TERRACOTTA: Material;

    public static readonly RED_MUSHROOM: Material;

    public static readonly MUSHROOM_STEM: Material;

    public static readonly RED_MUSHROOM_BLOCK: Material;

    public static readonly RED_NETHER_BRICK: Material;

    public static readonly RED_NETHER_BRICK_STAIRS: Material;

    public static readonly RED_SANDSTONE: Material;

    public static readonly CHISELED_RED_SANDSTONE: Material;

    public static readonly CUT_RED_SANDSTONE: Material;

    public static readonly SMOOTH_RED_SANDSTONE: Material;

    public static readonly RED_SANDSTONE_STAIRS: Material;

    public static readonly RED_SHULKER_BOX: Material;

    public static readonly RED_STAINED_GLASS: Material;

    public static readonly RED_STAINED_GLASS_PANE: Material;

    public static readonly RED_TERRACOTTA: Material;

    public static readonly RED_TULIP: Material;

    public static readonly RED_WOOL: Material;

    public static readonly REDSTONE: Material;

    public static readonly REDSTONE_BLOCK: Material;

    public static readonly REDSTONE_LAMP: Material;

    public static readonly REDSTONE_ORE: Material;

    public static readonly REDSTONE_TORCH: Material;

    public static readonly REINFORCED_DEEPSLATE: Material;

    public static readonly REPEATER: Material;

    public static readonly REPEATING_COMMAND_BLOCK: Material;

    public static readonly RESPAWN_ANCHOR: Material;

    public static readonly RIB_ARMOR_TRIM_SMITHING_TEMPLATE: Material;

    public static readonly ROSE_BUSH: Material;

    public static readonly ROTTEN_FLESH: Material;

    public static readonly SADDLE: Material;

    public static readonly SALMON: Material;

    public static readonly SALMON_BUCKET: Material;

    public static readonly SALMON_SPAWN_EGG: Material;

    public static readonly SAND: Material;

    public static readonly RED_SAND: Material;

    public static readonly SANDSTONE: Material;

    public static readonly CHISELED_SANDSTONE: Material;

    public static readonly CUT_SANDSTONE: Material;

    public static readonly SMOOTH_SANDSTONE: Material;

    public static readonly SANDSTONE_SLAB: Material;

    public static readonly SANDSTONE_STAIRS: Material;

    /**
     * @deprecated
     */
    public static readonly SAPLING: Material;

    public static readonly SCAFFOLDING: Material;

    public static readonly SCRAPE_POTTERY_SHERD: Material;

    public static readonly SCULK: Material;

    public static readonly SCULK_CATALYST: Material;

    public static readonly SCULK_SENSOR: Material;

    public static readonly SCULK_SHRIEKER: Material;

    public static readonly SCULK_VEIN: Material;

    public static readonly SEA_LANTERN: Material;

    public static readonly SEA_PICKLE: Material;

    public static readonly SEAGRASS: Material;

    public static readonly SENTRY_ARMOR_TRIM_SMITHING_TEMPLATE: Material;

    public static readonly SHAPER_ARMOR_TRIM_SMITHING_TEMPLATE: Material;

    public static readonly SHEAF_POTTERY_SHERD: Material;

    public static readonly SHEARS: Material;

    public static readonly SHEEP_SPAWN_EGG: Material;

    public static readonly SHELTER_POTTERY_SHERD: Material;

    public static readonly SHIELD: Material;

    public static readonly SHORT_GRASS: Material;

    public static readonly SHROOMLIGHT: Material;

    public static readonly SHULKER_BOX: Material;

    public static readonly SHULKER_SHELL: Material;

    public static readonly SHULKER_SPAWN_EGG: Material;

    public static readonly SILENCE_ARMOR_TRIM_SMITHING_TEMPLATE: Material;

    public static readonly SILVER_GLAZED_TERRACOTTA: Material;

    public static readonly SILVERFISH_SPAWN_EGG: Material;

    public static readonly SKELETON_HORSE_SPAWN_EGG: Material;

    public static readonly SKELETON_SPAWN_EGG: Material;

    /**
     * @deprecated
     */
    public static readonly SKULL: Material;

    public static readonly SKELETON_SKULL: Material;

    public static readonly WITHER_SKELETON_SKULL: Material;

    public static readonly ZOMBIE_HEAD: Material;

    public static readonly PLAYER_HEAD: Material;

    public static readonly CREEPER_HEAD: Material;

    public static readonly PIGLIN_HEAD: Material;

    public static readonly SKULL_BANNER_PATTERN: Material;

    public static readonly SKULL_POTTERY_SHERD: Material;

    public static readonly SLIME: Material;

    public static readonly SLIME_BALL: Material;

    public static readonly SLIME_SPAWN_EGG: Material;

    public static readonly SMALL_AMETHYST_BUD: Material;

    public static readonly SMALL_DRIPLEAF_BLOCK: Material;

    public static readonly SMITHING_TABLE: Material;

    public static readonly SMOKER: Material;

    public static readonly SMOOTH_BASALT: Material;

    public static readonly SMOOTH_QUARTZ_STAIRS: Material;

    public static readonly SMOOTH_RED_SANDSTONE_STAIRS: Material;

    public static readonly SMOOTH_SANDSTONE_STAIRS: Material;

    public static readonly SMOOTH_STONE: Material;

    public static readonly SMOOTH_STONE_SLAB: Material;

    public static readonly SNIFFER_EGG: Material;

    public static readonly SNIFFER_SPAWN_EGG: Material;

    public static readonly SNORT_POTTERY_SHERD: Material;

    public static readonly SNOUT_ARMOR_TRIM_SMITHING_TEMPLATE: Material;

    public static readonly SNOW: Material;

    public static readonly SNOW_GOLEM_SPAWN_EGG: Material;

    public static readonly SNOW_LAYER: Material;

    public static readonly SNOWBALL: Material;

    public static readonly SOUL_CAMPFIRE: Material;

    public static readonly SOUL_LANTERN: Material;

    public static readonly SOUL_SAND: Material;

    public static readonly SOUL_SOIL: Material;

    public static readonly SOUL_TORCH: Material;

    /**
     * @deprecated
     */
    public static readonly SPAWN_EGG: Material;

    public static readonly SPIDER_EYE: Material;

    public static readonly SPIDER_SPAWN_EGG: Material;

    public static readonly SPIRE_ARMOR_TRIM_SMITHING_TEMPLATE: Material;

    public static readonly SPLASH_POTION: Material;

    public static readonly SPONGE: Material;

    public static readonly SPORE_BLOSSOM: Material;

    public static readonly SPRUCE_BOAT: Material;

    public static readonly SPRUCE_BUTTON: Material;

    public static readonly SPRUCE_CHEST_BOAT: Material;

    public static readonly SPRUCE_DOOR: Material;

    public static readonly SPRUCE_FENCE: Material;

    public static readonly SPRUCE_FENCE_GATE: Material;

    public static readonly SPRUCE_HANGING_SIGN: Material;

    public static readonly SPRUCE_LEAVES: Material;

    public static readonly SPRUCE_LOG: Material;

    public static readonly SPRUCE_PLANKS: Material;

    public static readonly SPRUCE_PRESSURE_PLATE: Material;

    public static readonly SPRUCE_SAPLING: Material;

    public static readonly SPRUCE_SIGN: Material;

    public static readonly SPRUCE_SLAB: Material;

    public static readonly SPRUCE_STAIRS: Material;

    public static readonly SPRUCE_TRAPDOOR: Material;

    public static readonly SPRUCE_WOOD: Material;

    public static readonly SPYGLASS: Material;

    public static readonly SQUID_SPAWN_EGG: Material;

    /**
     * @deprecated
     */
    public static readonly STAINED_GLASS: Material;

    /**
     * @deprecated
     */
    public static readonly STAINED_GLASS_PANE: Material;

    /**
     * @deprecated
     */
    public static readonly STAINED_HARDENED_CLAY: Material;

    public static readonly STICK: Material;

    public static readonly STICKY_PISTON: Material;

    public static readonly STONE: Material;

    public static readonly STONE_AXE: Material;

    /**
     * @deprecated
     */
    public static readonly STONE_BLOCK_SLAB: Material;

    /**
     * @deprecated
     */
    public static readonly STONE_BLOCK_SLAB2: Material;

    public static readonly RED_SANDSTONE_SLAB: Material;

    public static readonly PURPUR_SLAB: Material;

    public static readonly PRISMARINE_SLAB: Material;

    public static readonly DARK_PRISMARINE_SLAB: Material;

    public static readonly PRISMARINE_BRICK_SLAB: Material;

    public static readonly MOSSY_COBBLESTONE_SLAB: Material;

    public static readonly SMOOTH_SANDSTONE_SLAB: Material;

    public static readonly RED_NETHER_BRICK_SLAB: Material;

    /**
     * @deprecated
     */
    public static readonly STONE_BLOCK_SLAB3: Material;

    public static readonly END_STONE_BRICK_SLAB: Material;

    public static readonly SMOOTH_RED_SANDSTONE_SLAB: Material;

    public static readonly POLISHED_ANDESITE_SLAB: Material;

    public static readonly ANDESITE_SLAB: Material;

    public static readonly DIORITE_SLAB: Material;

    public static readonly POLISHED_DIORITE_SLAB: Material;

    public static readonly GRANITE_SLAB: Material;

    public static readonly POLISHED_GRANITE_SLAB: Material;

    /**
     * @deprecated
     */
    public static readonly STONE_BLOCK_SLAB4: Material;

    public static readonly MOSSY_STONE_BRICK_SLAB: Material;

    public static readonly SMOOTH_QUARTZ_SLAB: Material;

    public static readonly NORMAL_STONE_SLAB: Material;

    public static readonly CUT_SANDSTONE_SLAB: Material;

    public static readonly CUT_RED_SANDSTONE_SLAB: Material;

    public static readonly STONE_BRICK_SLAB: Material;

    public static readonly STONE_BRICK_STAIRS: Material;

    public static readonly STONE_BUTTON: Material;

    public static readonly STONE_HOE: Material;

    public static readonly STONE_PICKAXE: Material;

    public static readonly STONE_PRESSURE_PLATE: Material;

    public static readonly STONE_SHOVEL: Material;

    public static readonly STONE_STAIRS: Material;

    public static readonly STONE_SWORD: Material;

    /**
     * @deprecated
     */
    public static readonly STONEBRICK: Material;

    public static readonly STONE_BRICKS: Material;

    public static readonly MOSSY_STONE_BRICKS: Material;

    public static readonly CRACKED_STONE_BRICKS: Material;

    public static readonly CHISELED_STONE_BRICKS: Material;

    public static readonly STONECUTTER_BLOCK: Material;

    public static readonly STRAY_SPAWN_EGG: Material;

    public static readonly STRIDER_SPAWN_EGG: Material;

    public static readonly STRING: Material;

    public static readonly STRIPPED_ACACIA_LOG: Material;

    public static readonly STRIPPED_ACACIA_WOOD: Material;

    public static readonly STRIPPED_BAMBOO_BLOCK: Material;

    public static readonly STRIPPED_BIRCH_LOG: Material;

    public static readonly STRIPPED_BIRCH_WOOD: Material;

    public static readonly STRIPPED_CHERRY_LOG: Material;

    public static readonly STRIPPED_CHERRY_WOOD: Material;

    public static readonly STRIPPED_CRIMSON_HYPHAE: Material;

    public static readonly STRIPPED_CRIMSON_STEM: Material;

    public static readonly STRIPPED_DARK_OAK_LOG: Material;

    public static readonly STRIPPED_DARK_OAK_WOOD: Material;

    public static readonly STRIPPED_JUNGLE_LOG: Material;

    public static readonly STRIPPED_JUNGLE_WOOD: Material;

    public static readonly STRIPPED_MANGROVE_LOG: Material;

    public static readonly STRIPPED_MANGROVE_WOOD: Material;

    public static readonly STRIPPED_OAK_LOG: Material;

    public static readonly STRIPPED_OAK_WOOD: Material;

    public static readonly STRIPPED_SPRUCE_LOG: Material;

    public static readonly STRIPPED_SPRUCE_WOOD: Material;

    public static readonly STRIPPED_WARPED_HYPHAE: Material;

    public static readonly STRIPPED_WARPED_STEM: Material;

    public static readonly STRUCTURE_BLOCK: Material;

    public static readonly STRUCTURE_VOID: Material;

    public static readonly SUGAR: Material;

    public static readonly SUGAR_CANE: Material;

    public static readonly SUNFLOWER: Material;

    public static readonly SUSPICIOUS_GRAVEL: Material;

    public static readonly SUSPICIOUS_SAND: Material;

    public static readonly SUSPICIOUS_STEW: Material;

    public static readonly SWEET_BERRY: Material;

    public static readonly TADPOLE_BUCKET: Material;

    public static readonly TADPOLE_SPAWN_EGG: Material;

    public static readonly TALL_GRASS: Material;

    /**
     * @deprecated
     */
    public static readonly TALLGRASS: Material;

    public static readonly TARGET: Material;

    public static readonly TIDE_ARMOR_TRIM_SMITHING_TEMPLATE: Material;

    public static readonly TINTED_GLASS: Material;

    public static readonly TNT: Material;

    public static readonly TNT_MINECART: Material;

    public static readonly TORCH: Material;

    public static readonly TORCHFLOWER: Material;

    public static readonly TORCHFLOWER_SEEDS: Material;

    public static readonly TOTEM_OF_UNDYING: Material;

    public static readonly TRADER_LLAMA_SPAWN_EGG: Material;

    public static readonly TRAPDOOR: Material;

    public static readonly TRAPPED_CHEST: Material;

    public static readonly TRIAL_KEY: Material;

    public static readonly TRIAL_SPAWNER: Material;

    public static readonly TRIDENT: Material;

    public static readonly TRIPWIRE_HOOK: Material;

    public static readonly TROPICAL_FISH: Material;

    public static readonly TROPICAL_FISH_BUCKET: Material;

    public static readonly TROPICAL_FISH_SPAWN_EGG: Material;

    public static readonly TUBE_CORAL: Material;

    public static readonly TUBE_CORAL_BLOCK: Material;

    public static readonly TUBE_CORAL_FAN: Material;

    public static readonly TUFF: Material;

    public static readonly TUFF_BRICK_SLAB: Material;

    public static readonly TUFF_BRICK_STAIRS: Material;

    public static readonly TUFF_BRICK_WALL: Material;

    public static readonly TUFF_BRICKS: Material;

    public static readonly TUFF_SLAB: Material;

    public static readonly TUFF_STAIRS: Material;

    public static readonly TUFF_WALL: Material;

    public static readonly TURTLE_EGG: Material;

    public static readonly TURTLE_HELMET: Material;

    public static readonly TURTLE_SCUTE: Material;

    public static readonly TURTLE_SPAWN_EGG: Material;

    public static readonly TWISTING_VINES: Material;

    public static readonly UNDYED_SHULKER_BOX: Material;

    public static readonly VAULT: Material;

    public static readonly VERDANT_FROGLIGHT: Material;

    public static readonly VEX_ARMOR_TRIM_SMITHING_TEMPLATE: Material;

    public static readonly VEX_SPAWN_EGG: Material;

    public static readonly VILLAGER_SPAWN_EGG: Material;

    public static readonly VINDICATOR_SPAWN_EGG: Material;

    public static readonly VINE: Material;

    public static readonly WANDERING_TRADER_SPAWN_EGG: Material;

    public static readonly WARD_ARMOR_TRIM_SMITHING_TEMPLATE: Material;

    public static readonly WARDEN_SPAWN_EGG: Material;

    public static readonly WARPED_BUTTON: Material;

    public static readonly WARPED_DOOR: Material;

    public static readonly WARPED_FENCE: Material;

    public static readonly WARPED_FENCE_GATE: Material;

    public static readonly WARPED_FUNGUS: Material;

    public static readonly WARPED_FUNGUS_ON_A_STICK: Material;

    public static readonly WARPED_HANGING_SIGN: Material;

    public static readonly WARPED_HYPHAE: Material;

    public static readonly WARPED_NYLIUM: Material;

    public static readonly WARPED_PLANKS: Material;

    public static readonly WARPED_PRESSURE_PLATE: Material;

    public static readonly WARPED_ROOTS: Material;

    public static readonly WARPED_SIGN: Material;

    public static readonly WARPED_SLAB: Material;

    public static readonly WARPED_STAIRS: Material;

    public static readonly WARPED_STEM: Material;

    public static readonly WARPED_TRAPDOOR: Material;

    public static readonly WARPED_WART_BLOCK: Material;

    public static readonly WATER_BUCKET: Material;

    public static readonly WATERLILY: Material;

    public static readonly WAXED_CHISELED_COPPER: Material;

    public static readonly WAXED_COPPER: Material;

    public static readonly WAXED_COPPER_BULB: Material;

    public static readonly WAXED_COPPER_DOOR: Material;

    public static readonly WAXED_COPPER_GRATE: Material;

    public static readonly WAXED_COPPER_TRAPDOOR: Material;

    public static readonly WAXED_CUT_COPPER: Material;

    public static readonly WAXED_CUT_COPPER_SLAB: Material;

    public static readonly WAXED_CUT_COPPER_STAIRS: Material;

    public static readonly WAXED_EXPOSED_CHISELED_COPPER: Material;

    public static readonly WAXED_EXPOSED_COPPER: Material;

    public static readonly WAXED_EXPOSED_COPPER_BULB: Material;

    public static readonly WAXED_EXPOSED_COPPER_DOOR: Material;

    public static readonly WAXED_EXPOSED_COPPER_GRATE: Material;

    public static readonly WAXED_EXPOSED_COPPER_TRAPDOOR: Material;

    public static readonly WAXED_EXPOSED_CUT_COPPER: Material;

    public static readonly WAXED_EXPOSED_CUT_COPPER_SLAB: Material;

    public static readonly WAXED_EXPOSED_CUT_COPPER_STAIRS: Material;

    public static readonly WAXED_OXIDIZED_CHISELED_COPPER: Material;

    public static readonly WAXED_OXIDIZED_COPPER: Material;

    public static readonly WAXED_OXIDIZED_COPPER_BULB: Material;

    public static readonly WAXED_OXIDIZED_COPPER_DOOR: Material;

    public static readonly WAXED_OXIDIZED_COPPER_GRATE: Material;

    public static readonly WAXED_OXIDIZED_COPPER_TRAPDOOR: Material;

    public static readonly WAXED_OXIDIZED_CUT_COPPER: Material;

    public static readonly WAXED_OXIDIZED_CUT_COPPER_SLAB: Material;

    public static readonly WAXED_OXIDIZED_CUT_COPPER_STAIRS: Material;

    public static readonly WAXED_WEATHERED_CHISELED_COPPER: Material;

    public static readonly WAXED_WEATHERED_COPPER: Material;

    public static readonly WAXED_WEATHERED_COPPER_BULB: Material;

    public static readonly WAXED_WEATHERED_COPPER_DOOR: Material;

    public static readonly WAXED_WEATHERED_COPPER_GRATE: Material;

    public static readonly WAXED_WEATHERED_COPPER_TRAPDOOR: Material;

    public static readonly WAXED_WEATHERED_CUT_COPPER: Material;

    public static readonly WAXED_WEATHERED_CUT_COPPER_SLAB: Material;

    public static readonly WAXED_WEATHERED_CUT_COPPER_STAIRS: Material;

    public static readonly WAYFINDER_ARMOR_TRIM_SMITHING_TEMPLATE: Material;

    public static readonly WEATHERED_CHISELED_COPPER: Material;

    public static readonly WEATHERED_COPPER: Material;

    public static readonly WEATHERED_COPPER_BULB: Material;

    public static readonly WEATHERED_COPPER_DOOR: Material;

    public static readonly WEATHERED_COPPER_GRATE: Material;

    public static readonly WEATHERED_COPPER_TRAPDOOR: Material;

    public static readonly WEATHERED_CUT_COPPER: Material;

    public static readonly WEATHERED_CUT_COPPER_SLAB: Material;

    public static readonly WEATHERED_CUT_COPPER_STAIRS: Material;

    public static readonly WEB: Material;

    public static readonly WEEPING_VINES: Material;

    public static readonly WHEAT: Material;

    public static readonly WHEAT_SEEDS: Material;

    public static readonly WHITE_CANDLE: Material;

    public static readonly WHITE_CARPET: Material;

    public static readonly WHITE_CONCRETE: Material;

    public static readonly WHITE_CONCRETE_POWDER: Material;

    public static readonly WHITE_DYE: Material;

    public static readonly WHITE_GLAZED_TERRACOTTA: Material;

    public static readonly WHITE_SHULKER_BOX: Material;

    public static readonly WHITE_STAINED_GLASS: Material;

    public static readonly WHITE_STAINED_GLASS_PANE: Material;

    public static readonly WHITE_TERRACOTTA: Material;

    public static readonly WHITE_TULIP: Material;

    public static readonly WHITE_WOOL: Material;

    public static readonly WILD_ARMOR_TRIM_SMITHING_TEMPLATE: Material;

    public static readonly WIND_CHARGE: Material;

    public static readonly WITCH_SPAWN_EGG: Material;

    public static readonly WITHER_ROSE: Material;

    public static readonly WITHER_SKELETON_SPAWN_EGG: Material;

    public static readonly WITHER_SPAWN_EGG: Material;

    public static readonly WOLF_ARMOR: Material;

    public static readonly WOLF_SPAWN_EGG: Material;

    /**
     * @deprecated
     */
    public static readonly WOOD: Material;

    public static readonly WOODEN_AXE: Material;

    public static readonly WOODEN_BUTTON: Material;

    public static readonly WOODEN_DOOR: Material;

    public static readonly WOODEN_HOE: Material;

    public static readonly WOODEN_PICKAXE: Material;

    public static readonly WOODEN_PRESSURE_PLATE: Material;

    public static readonly WOODEN_SHOVEL: Material;

    /**
     * @deprecated
     */
    public static readonly WOODEN_SLAB: Material;

    public static readonly WOODEN_SWORD: Material;

    /**
     * @deprecated
     */
    public static readonly WOOL: Material;

    public static readonly WRITABLE_BOOK: Material;

    public static readonly YELLOW_CANDLE: Material;

    public static readonly YELLOW_CARPET: Material;

    public static readonly YELLOW_CONCRETE: Material;

    public static readonly YELLOW_CONCRETE_POWDER: Material;

    public static readonly YELLOW_DYE: Material;

    /**
     * @deprecated
     */
    public static readonly YELLOW_FLOWER: Material;

    public static readonly DANDELION: Material;

    public static readonly YELLOW_GLAZED_TERRACOTTA: Material;

    public static readonly YELLOW_SHULKER_BOX: Material;

    public static readonly YELLOW_STAINED_GLASS: Material;

    public static readonly YELLOW_STAINED_GLASS_PANE: Material;

    public static readonly YELLOW_TERRACOTTA: Material;

    public static readonly YELLOW_WOOL: Material;

    public static readonly ZOGLIN_SPAWN_EGG: Material;

    public static readonly ZOMBIE_HORSE_SPAWN_EGG: Material;

    public static readonly ZOMBIE_PIGMAN_SPAWN_EGG: Material;

    public static readonly ZOMBIE_SPAWN_EGG: Material;

    public static readonly ZOMBIE_VILLAGER_SPAWN_EGG: Material;

    public static readonly ACACIA_DOUBLE_SLAB: Material;

    public static readonly ACACIA_STANDING_SIGN: Material;

    public static readonly ACACIA_WALL_SIGN: Material;

    public static readonly BAMBOO_DOUBLE_SLAB: Material;

    public static readonly BAMBOO_MOSAIC_DOUBLE_SLAB: Material;

    public static readonly BAMBOO_SAPLING: Material;

    public static readonly BAMBOO_STANDING_SIGN: Material;

    public static readonly BAMBOO_WALL_SIGN: Material;

    public static readonly BIRCH_DOUBLE_SLAB: Material;

    public static readonly BIRCH_STANDING_SIGN: Material;

    public static readonly BIRCH_WALL_SIGN: Material;

    public static readonly BLACK_CANDLE_CAKE: Material;

    public static readonly BLACKSTONE_DOUBLE_SLAB: Material;

    public static readonly BLUE_CANDLE_CAKE: Material;

    public static readonly BROWN_CANDLE_CAKE: Material;

    public static readonly BUBBLE_COLUMN: Material;

    public static readonly CAMERA: Material;

    public static readonly CANDLE_CAKE: Material;

    public static readonly CAVE_VINES: Material;

    public static readonly CAVE_VINES_BODY_WITH_BERRIES: Material;

    public static readonly CAVE_VINES_HEAD_WITH_BERRIES: Material;

    public static readonly CHEMICAL_HEAT: Material;

    public static readonly CHEMISTRY_TABLE: Material;

    public static readonly CHERRY_DOUBLE_SLAB: Material;

    public static readonly CHERRY_STANDING_SIGN: Material;

    public static readonly CHERRY_WALL_SIGN: Material;

    public static readonly CLIENT_REQUEST_PLACEHOLDER_BLOCK: Material;

    public static readonly COBBLED_DEEPSLATE_DOUBLE_SLAB: Material;

    public static readonly COCOA: Material;

    /**
     * @deprecated
     */
    public static readonly COLORED_TORCH_BP: Material;

    public static readonly COLORED_TORCH_BLUE: Material;

    public static readonly COLORED_TORCH_PURPLE: Material;

    /**
     * @deprecated
     */
    public static readonly COLORED_TORCH_RG: Material;

    public static readonly COLORED_TORCH_RED: Material;

    public static readonly COLORED_TORCH_GREEN: Material;

    /**
     * @deprecated
     */
    public static readonly CORAL_FAN_HANG: Material;

    public static readonly TUBE_CORAL_WALL_FAN: Material;

    public static readonly BRAIN_CORAL_WALL_FAN: Material;

    public static readonly DEAD_TUBE_CORAL_WALL_FAN: Material;

    public static readonly DEAD_BRAIN_CORAL_WALL_FAN: Material;

    /**
     * @deprecated
     */
    public static readonly CORAL_FAN_HANG2: Material;

    public static readonly BUBBLE_CORAL_WALL_FAN: Material;

    public static readonly FIRE_CORAL_WALL_FAN: Material;

    public static readonly DEAD_BUBBLE_CORAL_WALL_FAN: Material;

    public static readonly DEAD_FIRE_CORAL_WALL_FAN: Material;

    /**
     * @deprecated
     */
    public static readonly CORAL_FAN_HANG3: Material;

    public static readonly HORN_CORAL_WALL_FAN: Material;

    public static readonly DEAD_HORN_CORAL_WALL_FAN: Material;

    public static readonly CRIMSON_DOUBLE_SLAB: Material;

    public static readonly CRIMSON_STANDING_SIGN: Material;

    public static readonly CRIMSON_WALL_SIGN: Material;

    public static readonly CYAN_CANDLE_CAKE: Material;

    public static readonly DARK_OAK_DOUBLE_SLAB: Material;

    public static readonly DARKOAK_STANDING_SIGN: Material;

    public static readonly DARKOAK_WALL_SIGN: Material;

    public static readonly DAYLIGHT_DETECTOR_INVERTED: Material;

    public static readonly DEEPSLATE_BRICK_DOUBLE_SLAB: Material;

    public static readonly DEEPSLATE_TILE_DOUBLE_SLAB: Material;

    public static readonly DOUBLE_CUT_COPPER_SLAB: Material;

    /**
     * @deprecated
     */
    public static readonly DOUBLE_STONE_BLOCK_SLAB: Material;

    public static readonly SMOOTH_STONE_DOUBLE_SLAB: Material;

    public static readonly SANDSTONE_DOUBLE_SLAB: Material;

    public static readonly COBBLESTONE_DOUBLE_SLAB: Material;

    public static readonly BRICK_DOUBLE_SLAB: Material;

    public static readonly STONE_BRICK_DOUBLE_SLAB: Material;

    public static readonly QUARTZ_DOUBLE_SLAB: Material;

    public static readonly NETHER_BRICK_DOUBLE_SLAB: Material;

    /**
     * @deprecated
     */
    public static readonly DOUBLE_STONE_BLOCK_SLAB2: Material;

    public static readonly RED_SANDSTONE_DOUBLE_SLAB: Material;

    public static readonly PURPUR_DOUBLE_SLAB: Material;

    public static readonly PRISMARINE_DOUBLE_SLAB: Material;

    public static readonly DARK_PRISMARINE_DOUBLE_SLAB: Material;

    public static readonly PRISMARINE_BRICK_DOUBLE_SLAB: Material;

    public static readonly MOSSY_COBBLESTONE_DOUBLE_SLAB: Material;

    public static readonly SMOOTH_SANDSTONE_DOUBLE_SLAB: Material;

    public static readonly RED_NETHER_BRICK_DOUBLE_SLAB: Material;

    /**
     * @deprecated
     */
    public static readonly DOUBLE_STONE_BLOCK_SLAB3: Material;

    public static readonly END_STONE_BRICK_DOUBLE_SLAB: Material;

    public static readonly SMOOTH_RED_SANDSTONE_DOUBLE_SLAB: Material;

    public static readonly POLISHED_ANDESITE_DOUBLE_SLAB: Material;

    public static readonly ANDESITE_DOUBLE_SLAB: Material;

    public static readonly DIORITE_DOUBLE_SLAB: Material;

    public static readonly POLISHED_DIORITE_DOUBLE_SLAB: Material;

    public static readonly GRANITE_DOUBLE_SLAB: Material;

    public static readonly POLISHED_GRANITE_DOUBLE_SLAB: Material;

    /**
     * @deprecated
     */
    public static readonly DOUBLE_STONE_BLOCK_SLAB4: Material;

    public static readonly MOSSY_STONE_BRICK_DOUBLE_SLAB: Material;

    public static readonly SMOOTH_QUARTZ_DOUBLE_SLAB: Material;

    public static readonly NORMAL_STONE_DOUBLE_SLAB: Material;

    public static readonly CUT_SANDSTONE_DOUBLE_SLAB: Material;

    public static readonly CUT_RED_SANDSTONE_DOUBLE_SLAB: Material;

    public static readonly ELEMENT_0: Material;

    public static readonly ELEMENT_1: Material;

    public static readonly ELEMENT_10: Material;

    public static readonly ELEMENT_100: Material;

    public static readonly ELEMENT_101: Material;

    public static readonly ELEMENT_102: Material;

    public static readonly ELEMENT_103: Material;

    public static readonly ELEMENT_104: Material;

    public static readonly ELEMENT_105: Material;

    public static readonly ELEMENT_106: Material;

    public static readonly ELEMENT_107: Material;

    public static readonly ELEMENT_108: Material;

    public static readonly ELEMENT_109: Material;

    public static readonly ELEMENT_11: Material;

    public static readonly ELEMENT_110: Material;

    public static readonly ELEMENT_111: Material;

    public static readonly ELEMENT_112: Material;

    public static readonly ELEMENT_113: Material;

    public static readonly ELEMENT_114: Material;

    public static readonly ELEMENT_115: Material;

    public static readonly ELEMENT_116: Material;

    public static readonly ELEMENT_117: Material;

    public static readonly ELEMENT_118: Material;

    public static readonly ELEMENT_12: Material;

    public static readonly ELEMENT_13: Material;

    public static readonly ELEMENT_14: Material;

    public static readonly ELEMENT_15: Material;

    public static readonly ELEMENT_16: Material;

    public static readonly ELEMENT_17: Material;

    public static readonly ELEMENT_18: Material;

    public static readonly ELEMENT_19: Material;

    public static readonly ELEMENT_2: Material;

    public static readonly ELEMENT_20: Material;

    public static readonly ELEMENT_21: Material;

    public static readonly ELEMENT_22: Material;

    public static readonly ELEMENT_23: Material;

    public static readonly ELEMENT_24: Material;

    public static readonly ELEMENT_25: Material;

    public static readonly ELEMENT_26: Material;

    public static readonly ELEMENT_27: Material;

    public static readonly ELEMENT_28: Material;

    public static readonly ELEMENT_29: Material;

    public static readonly ELEMENT_3: Material;

    public static readonly ELEMENT_30: Material;

    public static readonly ELEMENT_31: Material;

    public static readonly ELEMENT_32: Material;

    public static readonly ELEMENT_33: Material;

    public static readonly ELEMENT_34: Material;

    public static readonly ELEMENT_35: Material;

    public static readonly ELEMENT_36: Material;

    public static readonly ELEMENT_37: Material;

    public static readonly ELEMENT_38: Material;

    public static readonly ELEMENT_39: Material;

    public static readonly ELEMENT_4: Material;

    public static readonly ELEMENT_40: Material;

    public static readonly ELEMENT_41: Material;

    public static readonly ELEMENT_42: Material;

    public static readonly ELEMENT_43: Material;

    public static readonly ELEMENT_44: Material;

    public static readonly ELEMENT_45: Material;

    public static readonly ELEMENT_46: Material;

    public static readonly ELEMENT_47: Material;

    public static readonly ELEMENT_48: Material;

    public static readonly ELEMENT_49: Material;

    public static readonly ELEMENT_5: Material;

    public static readonly ELEMENT_50: Material;

    public static readonly ELEMENT_51: Material;

    public static readonly ELEMENT_52: Material;

    public static readonly ELEMENT_53: Material;

    public static readonly ELEMENT_54: Material;

    public static readonly ELEMENT_55: Material;

    public static readonly ELEMENT_56: Material;

    public static readonly ELEMENT_57: Material;

    public static readonly ELEMENT_58: Material;

    public static readonly ELEMENT_59: Material;

    public static readonly ELEMENT_6: Material;

    public static readonly ELEMENT_60: Material;

    public static readonly ELEMENT_61: Material;

    public static readonly ELEMENT_62: Material;

    public static readonly ELEMENT_63: Material;

    public static readonly ELEMENT_64: Material;

    public static readonly ELEMENT_65: Material;

    public static readonly ELEMENT_66: Material;

    public static readonly ELEMENT_67: Material;

    public static readonly ELEMENT_68: Material;

    public static readonly ELEMENT_69: Material;

    public static readonly ELEMENT_7: Material;

    public static readonly ELEMENT_70: Material;

    public static readonly ELEMENT_71: Material;

    public static readonly ELEMENT_72: Material;

    public static readonly ELEMENT_73: Material;

    public static readonly ELEMENT_74: Material;

    public static readonly ELEMENT_75: Material;

    public static readonly ELEMENT_76: Material;

    public static readonly ELEMENT_77: Material;

    public static readonly ELEMENT_78: Material;

    public static readonly ELEMENT_79: Material;

    public static readonly ELEMENT_8: Material;

    public static readonly ELEMENT_80: Material;

    public static readonly ELEMENT_81: Material;

    public static readonly ELEMENT_82: Material;

    public static readonly ELEMENT_83: Material;

    public static readonly ELEMENT_84: Material;

    public static readonly ELEMENT_85: Material;

    public static readonly ELEMENT_86: Material;

    public static readonly ELEMENT_87: Material;

    public static readonly ELEMENT_88: Material;

    public static readonly ELEMENT_89: Material;

    public static readonly ELEMENT_9: Material;

    public static readonly ELEMENT_90: Material;

    public static readonly ELEMENT_91: Material;

    public static readonly ELEMENT_92: Material;

    public static readonly ELEMENT_93: Material;

    public static readonly ELEMENT_94: Material;

    public static readonly ELEMENT_95: Material;

    public static readonly ELEMENT_96: Material;

    public static readonly ELEMENT_97: Material;

    public static readonly ELEMENT_98: Material;

    public static readonly ELEMENT_99: Material;

    public static readonly END_GATEWAY: Material;

    public static readonly END_PORTAL: Material;

    public static readonly EXPOSED_DOUBLE_CUT_COPPER_SLAB: Material;

    public static readonly FIRE: Material;

    public static readonly FLOWING_LAVA: Material;

    public static readonly FLOWING_WATER: Material;

    public static readonly GLOWINGOBSIDIAN: Material;

    public static readonly GRAY_CANDLE_CAKE: Material;

    public static readonly GREEN_CANDLE_CAKE: Material;

    public static readonly HARD_BLACK_STAINED_GLASS: Material;

    public static readonly HARD_BLACK_STAINED_GLASS_PANE: Material;

    public static readonly HARD_BLUE_STAINED_GLASS: Material;

    public static readonly HARD_BLUE_STAINED_GLASS_PANE: Material;

    public static readonly HARD_BROWN_STAINED_GLASS: Material;

    public static readonly HARD_BROWN_STAINED_GLASS_PANE: Material;

    public static readonly HARD_CYAN_STAINED_GLASS: Material;

    public static readonly HARD_CYAN_STAINED_GLASS_PANE: Material;

    public static readonly HARD_GLASS: Material;

    public static readonly HARD_GLASS_PANE: Material;

    public static readonly HARD_GRAY_STAINED_GLASS: Material;

    public static readonly HARD_GRAY_STAINED_GLASS_PANE: Material;

    public static readonly HARD_GREEN_STAINED_GLASS: Material;

    public static readonly HARD_GREEN_STAINED_GLASS_PANE: Material;

    public static readonly HARD_LIGHT_BLUE_STAINED_GLASS: Material;

    public static readonly HARD_LIGHT_BLUE_STAINED_GLASS_PANE: Material;

    public static readonly HARD_LIGHT_GRAY_STAINED_GLASS: Material;

    public static readonly HARD_LIGHT_GRAY_STAINED_GLASS_PANE: Material;

    public static readonly HARD_LIME_STAINED_GLASS: Material;

    public static readonly HARD_LIME_STAINED_GLASS_PANE: Material;

    public static readonly HARD_MAGENTA_STAINED_GLASS: Material;

    public static readonly HARD_MAGENTA_STAINED_GLASS_PANE: Material;

    public static readonly HARD_ORANGE_STAINED_GLASS: Material;

    public static readonly HARD_ORANGE_STAINED_GLASS_PANE: Material;

    public static readonly HARD_PINK_STAINED_GLASS: Material;

    public static readonly HARD_PINK_STAINED_GLASS_PANE: Material;

    public static readonly HARD_PURPLE_STAINED_GLASS: Material;

    public static readonly HARD_PURPLE_STAINED_GLASS_PANE: Material;

    public static readonly HARD_RED_STAINED_GLASS: Material;

    public static readonly HARD_RED_STAINED_GLASS_PANE: Material;

    public static readonly HARD_WHITE_STAINED_GLASS: Material;

    public static readonly HARD_WHITE_STAINED_GLASS_PANE: Material;

    public static readonly HARD_YELLOW_STAINED_GLASS: Material;

    public static readonly HARD_YELLOW_STAINED_GLASS_PANE: Material;

    public static readonly INFO_UPDATE: Material;

    public static readonly INFO_UPDATE2: Material;

    public static readonly INVISIBLE_BEDROCK: Material;

    public static readonly JUNGLE_DOUBLE_SLAB: Material;

    public static readonly JUNGLE_STANDING_SIGN: Material;

    public static readonly JUNGLE_WALL_SIGN: Material;

    public static readonly LAVA: Material;

    public static readonly LIGHT_BLUE_CANDLE_CAKE: Material;

    public static readonly LIGHT_GRAY_CANDLE_CAKE: Material;

    public static readonly LIME_CANDLE_CAKE: Material;

    public static readonly LIT_BLAST_FURNACE: Material;

    public static readonly LIT_DEEPSLATE_REDSTONE_ORE: Material;

    public static readonly LIT_FURNACE: Material;

    public static readonly LIT_REDSTONE_LAMP: Material;

    public static readonly LIT_REDSTONE_ORE: Material;

    public static readonly LIT_SMOKER: Material;

    public static readonly MAGENTA_CANDLE_CAKE: Material;

    public static readonly MANGROVE_DOUBLE_SLAB: Material;

    public static readonly MANGROVE_STANDING_SIGN: Material;

    public static readonly MANGROVE_WALL_SIGN: Material;

    public static readonly MELON_STEM: Material;

    public static readonly MOVING_BLOCK: Material;

    public static readonly MUD_BRICK_DOUBLE_SLAB: Material;

    public static readonly NETHERREACTOR: Material;

    public static readonly OAK_DOUBLE_SLAB: Material;

    public static readonly ORANGE_CANDLE_CAKE: Material;

    public static readonly OXIDIZED_DOUBLE_CUT_COPPER_SLAB: Material;

    public static readonly PINK_CANDLE_CAKE: Material;

    public static readonly PISTON_ARM_COLLISION: Material;

    public static readonly PITCHER_CROP: Material;

    public static readonly POLISHED_BLACKSTONE_BRICK_DOUBLE_SLAB: Material;

    public static readonly POLISHED_BLACKSTONE_DOUBLE_SLAB: Material;

    public static readonly POLISHED_DEEPSLATE_DOUBLE_SLAB: Material;

    public static readonly POLISHED_TUFF_DOUBLE_SLAB: Material;

    public static readonly PORTAL: Material;

    public static readonly POWDER_SNOW: Material;

    public static readonly POWERED_COMPARATOR: Material;

    public static readonly POWERED_REPEATER: Material;

    public static readonly PUMPKIN_STEM: Material;

    public static readonly PURPLE_CANDLE_CAKE: Material;

    public static readonly RED_CANDLE_CAKE: Material;

    public static readonly REDSTONE_WIRE: Material;

    public static readonly REEDS: Material;

    public static readonly RESERVED6: Material;

    public static readonly SOUL_FIRE: Material;

    public static readonly SPRUCE_DOUBLE_SLAB: Material;

    public static readonly SPRUCE_STANDING_SIGN: Material;

    public static readonly SPRUCE_WALL_SIGN: Material;

    public static readonly STANDING_BANNER: Material;

    public static readonly STANDING_SIGN: Material;

    public static readonly STICKY_PISTON_ARM_COLLISION: Material;

    public static readonly STONECUTTER: Material;

    public static readonly TORCHFLOWER_CROP: Material;

    public static readonly TRIP_WIRE: Material;

    public static readonly TUFF_BRICK_DOUBLE_SLAB: Material;

    public static readonly TUFF_DOUBLE_SLAB: Material;

    public static readonly UNDERWATER_TORCH: Material;

    public static readonly UNKNOWN: Material;

    public static readonly UNLIT_REDSTONE_TORCH: Material;

    public static readonly UNPOWERED_COMPARATOR: Material;

    public static readonly UNPOWERED_REPEATER: Material;

    public static readonly WALL_BANNER: Material;

    public static readonly WALL_SIGN: Material;

    public static readonly WARPED_DOUBLE_SLAB: Material;

    public static readonly WARPED_STANDING_SIGN: Material;

    public static readonly WARPED_WALL_SIGN: Material;

    public static readonly WATER: Material;

    public static readonly WAXED_DOUBLE_CUT_COPPER_SLAB: Material;

    public static readonly WAXED_EXPOSED_DOUBLE_CUT_COPPER_SLAB: Material;

    public static readonly WAXED_OXIDIZED_DOUBLE_CUT_COPPER_SLAB: Material;

    public static readonly WAXED_WEATHERED_DOUBLE_CUT_COPPER_SLAB: Material;

    public static readonly WEATHERED_DOUBLE_CUT_COPPER_SLAB: Material;

    public static readonly WHITE_CANDLE_CAKE: Material;

    public static readonly YELLOW_CANDLE_CAKE: Material;
}
