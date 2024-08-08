import { ItemType, BlockType, ItemTypes, BlockTypes } from "@minecraft/server";

const PRIVATE_CONSTRUCTOR_SYMBOL = Symbol();

/**
 * @type {MaterialTag[]}
 */
const tags = [];

export class MaterialTag {
    /**
     * @readonly
     * @private
     * @type {string}
     */
    keyName;

    /**
     * @private
     * @type {string}
     */
    #name;

    /**
     * @private
     */
    constructor(key, keyName, name) {
        if (key !== PRIVATE_CONSTRUCTOR_SYMBOL) {
            throw new TypeError();
        }

        this.keyName = keyName;
        this.#name = name;
        tags.push(this);
    }

    toString() {
        return this.#name;
    }

    /**
     * コンポスターに入れられるアイテム
     * @readonly
     */
    static COMPOSTABLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "compostables", "compostable");

    /**
     * 食べることができるアイテム
     * @readonly
     */
    static FOODS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "foods", "foods");

    /**
     * 固体のブロック
     * @readonly
     */
    static SOLID_BLOCKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "solids", "solid_blocks");

    /**
     * レコード
     * @readonly
     */
    static RECORDS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "records", "records");

    /**
     * エンチャント可能なアイテム
     * @readonly
     */
    static ENCHANTABLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "enchantables", "enchantable");

    /**
     * 可燃性を持つブロック
     * @readonly
     */
    static BURNABLE_BLOCKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "burnableBlocks", "burnable_blocks");

    /**
     * 燃料になれるアイテム
     * @readonly
     */
    static FUELS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "fuels", "fuels");

    /**
     * 光を通すブロック
     * @readonly
     */
    static LIGHT_PASSABLE_BLOCKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lightPassables", "light_passable_blocks");

    /**
     * 装備
     * @readonly
     */
    static ARMORS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "armors", "armors");

    /**
     * ツール
     * @readonly
     */
    static TOOLS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "tools", "tools");

    /**
     * 武器
     * @readonly
     */
    static WEAPONS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "weapons", "weapons");

    /**
     * ピッケルが適正ツールのブロック
     * @readonly
     */
    static MINEABLE_BY_PICKAXE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mineable.pickaxe", "mineable_by_pickaxe");

    /**
     * 斧が適正ツールのブロック
     * @readonly
     */
    static MINEABLE_BY_AXE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mineable.axe", "mineable_by_axe");

    /**
     * シャベルが適正ツールのブロック
     * @readonly
     */
    static MINEABLE_BY_SHOVEL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mineable.shovel", "mineable_by_shovel");

    /**
     * クワが適正ツールのブロック
     * @readonly
     */
    static MINEABLE_BY_HOE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mineable.hoe", "mineable_by_hoe");

    /**
     * 木材
     * @readonly
     */
    static PLANKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "planks", "planks");

    /**
     * 原木・丸太
     * @readonly
     */
    static LOGS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "logs", "logs");

    /**
     * ハーフブロック
     * @readonly
     */
    static SLABS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "slabs", "slabs");

    /**
     * @returns {MaterialTag[]}
     */
    static values() {
        return [...tags];
    }
}

/**
 * @type {Material[]}
 */
const materials = [];

export class Material {
    /**
     * @type {string}
     */
    #blockId;

    /**
     * @type {string}
     */
    #itemId;

    /**
     * @type {boolean}
     */
    #isBlock;

    /**
     * @type {boolean}
     */
    #isItem;

    /**
     * @type {string[]}
     */
    #blockPropertyNames;

    /**
     * @private
     */
    constructor(key, blockId, itemId, isBlock, isItem, blockPropertyNames, isHighPriority) {
        if (key != PRIVATE_CONSTRUCTOR_SYMBOL) {
            throw new TypeError();
        }

        this.#blockId = blockId;
        this.#itemId = itemId;
        this.#isBlock = isBlock;
        this.#isItem = isItem;
        this.#blockPropertyNames = blockPropertyNames;

        if (isHighPriority) {
            materials.unshift(this);
        }
        else {
            materials.push(this);
        }
    }

    /**
     * @minecraft/server.ItemTypeとして取得します。
     * @returns {ItemType}
     * @throws {TypeError}
     */
    getAsItemType() {
        if (!this.#isItem) {
            throw new TypeError("このマテリアルはアイテムではありません");
        }

        return ItemTypes.get(this.#itemId);
    }

    /**
     * @minecraft/server.BlockTypeとして取得します。
     * @returns {BlockType}
     * @throws {TypeError}
     */
    getAsBlockType() {
        if (!this.#isBlock) {
            throw new TypeError("このマテリアルはブロックではありません");
        }

        return BlockTypes.get(this.#blockId);
    }

    /**
     * ブロックとして存在できるならば真
     * @readonly
     * @returns {boolean}
     */
    get isBlock() {
        return this.#isBlock;
    }

    set isBlock(_) {
        throw new TypeError();
    }

    /**
     * アイテムとして存在できるならば真
     * @readonly
     * @returns {boolean}
     */
    get isItem() {
        return this.#isItem;
    }

    set isItem(_) {
        throw new TypeError();
    }

    /**
     * 保持するブロック状態名を全て取得します。
     * @returns {string[]}
     * @throws {TypeError}
     */
    getBlockPropertyNames() {
        if (!this.#isBlock) {
            throw new TypeError("このマテリアルはブロックではありません");
        }

        return this.#blockPropertyNames;
    }

    /**
     * 指定のマテリアルタグを持っていれば真
     * @param {MaterialTag} tag
     * @returns {boolean}
     */
    hasTag(tag) {
        if (tag instanceof MaterialTag) {
            return bukkitOut[tag.keyName].includes(this.#itemId) || bukkitOut[tag.keyName].includes(this.#blockId);
        }
       else throw new TypeError("引数はMaterialTag型です");
    }

    /**
     * 保持するマテリアルタグを全て取得します。
     * @returns {MaterialTag[]}
     */
    getTags() {
        return MaterialTag.values().filter(e => this.hasTag(e));
    }

    /**
     * ブロックID・アイテムIDを基にマテリアルを取得します。    
     * 存在しなければundefinedを返します。
     * @param {string} id
     * @returns {Material | undefined}
     */
    static getMaterial(id) {
        const simpleId = id.replace("minecraft:", "");
        for (const material of materials) {
            if (material.#blockId === id || material.#itemId === id || material.#blockId === simpleId || material.#itemId === simpleId) {
               return material;
            }
        }
    }

    /**
     * @returns {Material[]}
     */
    static values() {
        return [...materials];
    }

    /**
     * @readonly
     */
     static ACACIA_BOAT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "acacia_boat", false, true, []);

    /**
     * @readonly
     */
     static ACACIA_BUTTON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "acacia_button", "acacia_button", true, true, ["button_pressed_bit", "facing_direction"]);

    /**
     * @readonly
     */
     static ACACIA_CHEST_BOAT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "acacia_chest_boat", false, true, []);

    /**
     * @readonly
     */
     static ACACIA_DOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "acacia_door", "acacia_door", true, true, ["direction", "door_hinge_bit", "open_bit", "upper_block_bit"]);

    /**
     * @readonly
     */
     static ACACIA_FENCE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "acacia_fence", "acacia_fence", true, true, []);

    /**
     * @readonly
     */
     static ACACIA_FENCE_GATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "acacia_fence_gate", "acacia_fence_gate", true, true, ["direction", "in_wall_bit", "open_bit"]);

    /**
     * @readonly
     */
     static ACACIA_HANGING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "acacia_hanging_sign", "acacia_hanging_sign", true, true, ["attached_bit", "facing_direction", "ground_sign_direction", "hanging"]);

    /**
     * @readonly
     */
     static ACACIA_LEAVES = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "acacia_leaves", "acacia_leaves", true, true, ["persistent_bit", "update_bit"]);

    /**
     * @readonly
     */
     static ACACIA_LOG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "acacia_log", "acacia_log", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static ACACIA_PLANKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "acacia_planks", "acacia_planks", true, true, []);

    /**
     * @readonly
     */
     static ACACIA_PRESSURE_PLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "acacia_pressure_plate", "acacia_pressure_plate", true, true, ["redstone_signal"]);

    /**
     * @readonly
     */
     static ACACIA_SAPLING = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "acacia_sapling", "acacia_sapling", true, true, ["age_bit"]);

    /**
     * @readonly
     */
     static ACACIA_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "acacia_sign", false, true, []);

    /**
     * @readonly
     */
     static ACACIA_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "acacia_slab", "acacia_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static ACACIA_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "acacia_stairs", "acacia_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static ACACIA_TRAPDOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "acacia_trapdoor", "acacia_trapdoor", true, true, ["direction", "open_bit", "upside_down_bit"]);

    /**
     * @readonly
     */
     static ACACIA_WOOD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "acacia_wood", "acacia_wood", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static ACTIVATOR_RAIL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "activator_rail", "activator_rail", true, true, ["rail_data_bit", "rail_direction"]);

    /**
     * @readonly
     */
     static AIR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "air", "air", true, true, []);

    /**
     * @readonly
     */
     static ALLAY_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "allay_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static ALLIUM = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "allium", "allium", true, true, []);

    /**
     * @readonly
     */
     static ALLOW = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "allow", "allow", true, true, []);

    /**
     * @readonly
     */
     static AMETHYST_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "amethyst_block", "amethyst_block", true, true, []);

    /**
     * @readonly
     */
     static AMETHYST_CLUSTER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "amethyst_cluster", "amethyst_cluster", true, true, ["minecraft:block_face"]);

    /**
     * @readonly
     */
     static AMETHYST_SHARD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "amethyst_shard", false, true, []);

    /**
     * @readonly
     */
     static ANCIENT_DEBRIS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "ancient_debris", "ancient_debris", true, true, []);

    /**
     * @readonly
     */
     static ANDESITE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "andesite", "andesite", true, true, []);

    /**
     * @readonly
     */
     static ANDESITE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "andesite_stairs", "andesite_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static ANGLER_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "angler_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static ANVIL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "anvil", "anvil", true, true, ["damage", "minecraft:cardinal_direction"]);

    /**
     * @readonly
     */
     static APPLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "apple", false, true, []);

    /**
     * @readonly
     */
     static ARCHER_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "archer_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static ARMADILLO_SCUTE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "armadillo_scute", false, true, []);

    /**
     * @readonly
     */
     static ARMADILLO_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "armadillo_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static ARMOR_STAND = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "armor_stand", false, true, []);

    /**
     * @readonly
     */
     static ARMS_UP_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "arms_up_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static ARROW = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "arrow", false, true, []);

    /**
     * @readonly
     */
     static AXOLOTL_BUCKET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "flowing_water", "axolotl_bucket", true, true, []);

    /**
     * @readonly
     */
     static AXOLOTL_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "axolotl_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static AZALEA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "azalea", "azalea", true, true, []);

    /**
     * @readonly
     */
     static AZALEA_LEAVES = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "azalea_leaves", "azalea_leaves", true, true, ["persistent_bit", "update_bit"]);

    /**
     * @readonly
     */
     static AZALEA_LEAVES_FLOWERED = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "azalea_leaves_flowered", "azalea_leaves_flowered", true, true, ["persistent_bit", "update_bit"]);

    /**
     * @readonly
     */
     static AZURE_BLUET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "azure_bluet", "azure_bluet", true, true, []);

    /**
     * @readonly
     */
     static BAKED_POTATO = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "baked_potato", false, true, []);

    /**
     * @readonly
     */
     static BAMBOO = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bamboo", "bamboo", true, true, ["age_bit", "bamboo_leaf_size", "bamboo_stalk_thickness"]);

    /**
     * @readonly
     */
     static BAMBOO_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bamboo_block", "bamboo_block", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static BAMBOO_BUTTON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bamboo_button", "bamboo_button", true, true, ["button_pressed_bit", "facing_direction"]);

    /**
     * @readonly
     */
     static BAMBOO_CHEST_RAFT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "bamboo_chest_raft", false, true, []);

    /**
     * @readonly
     */
     static BAMBOO_DOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bamboo_door", "bamboo_door", true, true, ["direction", "door_hinge_bit", "open_bit", "upper_block_bit"]);

    /**
     * @readonly
     */
     static BAMBOO_FENCE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bamboo_fence", "bamboo_fence", true, true, []);

    /**
     * @readonly
     */
     static BAMBOO_FENCE_GATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bamboo_fence_gate", "bamboo_fence_gate", true, true, ["direction", "in_wall_bit", "open_bit"]);

    /**
     * @readonly
     */
     static BAMBOO_HANGING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bamboo_hanging_sign", "bamboo_hanging_sign", true, true, ["attached_bit", "facing_direction", "ground_sign_direction", "hanging"]);

    /**
     * @readonly
     */
     static BAMBOO_MOSAIC = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bamboo_mosaic", "bamboo_mosaic", true, true, []);

    /**
     * @readonly
     */
     static BAMBOO_MOSAIC_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bamboo_mosaic_slab", "bamboo_mosaic_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static BAMBOO_MOSAIC_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bamboo_mosaic_stairs", "bamboo_mosaic_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static BAMBOO_PLANKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bamboo_planks", "bamboo_planks", true, true, []);

    /**
     * @readonly
     */
     static BAMBOO_PRESSURE_PLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bamboo_pressure_plate", "bamboo_pressure_plate", true, true, ["redstone_signal"]);

    /**
     * @readonly
     */
     static BAMBOO_RAFT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "bamboo_raft", false, true, []);

    /**
     * @readonly
     */
     static BAMBOO_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "bamboo_sign", false, true, []);

    /**
     * @readonly
     */
     static BAMBOO_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bamboo_slab", "bamboo_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static BAMBOO_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bamboo_stairs", "bamboo_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static BAMBOO_TRAPDOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bamboo_trapdoor", "bamboo_trapdoor", true, true, ["direction", "open_bit", "upside_down_bit"]);

    /**
     * @readonly
     */
     static BANNER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "banner", false, true, []);

    /**
     * @readonly
     */
     static BANNER_PATTERN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "banner_pattern", false, true, []);

    /**
     * @readonly
     */
     static BARREL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "barrel", "barrel", true, true, ["facing_direction", "open_bit"]);

    /**
     * @readonly
     */
     static BARRIER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "barrier", "barrier", true, true, []);

    /**
     * @readonly
     */
     static BASALT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "basalt", "basalt", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static BAT_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "bat_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static BEACON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "beacon", "beacon", true, true, []);

    /**
     * @readonly
     */
     static BED = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bed", "bed", true, true, ["direction", "head_piece_bit", "occupied_bit"]);

    /**
     * @readonly
     */
     static BEDROCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bedrock", "bedrock", true, true, ["infiniburn_bit"]);

    /**
     * @readonly
     */
     static BEE_NEST = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bee_nest", "bee_nest", true, true, ["direction", "honey_level"]);

    /**
     * @readonly
     */
     static BEE_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "bee_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static BEEF = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "beef", false, true, []);

    /**
     * @readonly
     */
     static BEEHIVE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "beehive", "beehive", true, true, ["direction", "honey_level"]);

    /**
     * @readonly
     */
     static BEETROOT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "beetroot", "beetroot", true, true, ["growth"]);

    /**
     * @readonly
     */
     static BEETROOT_SEEDS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "beetroot_seeds", false, true, []);

    /**
     * @readonly
     */
     static BEETROOT_SOUP = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "beetroot_soup", false, true, []);

    /**
     * @readonly
     */
     static BELL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bell", "bell", true, true, ["attachment", "direction", "toggle_bit"]);

    /**
     * @readonly
     */
     static BIG_DRIPLEAF = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "big_dripleaf", "big_dripleaf", true, true, ["big_dripleaf_head", "big_dripleaf_tilt", "minecraft:cardinal_direction"]);

    /**
     * @readonly
     */
     static BIRCH_BOAT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "birch_boat", false, true, []);

    /**
     * @readonly
     */
     static BIRCH_BUTTON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "birch_button", "birch_button", true, true, ["button_pressed_bit", "facing_direction"]);

    /**
     * @readonly
     */
     static BIRCH_CHEST_BOAT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "birch_chest_boat", false, true, []);

    /**
     * @readonly
     */
     static BIRCH_DOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "birch_door", "birch_door", true, true, ["direction", "door_hinge_bit", "open_bit", "upper_block_bit"]);

    /**
     * @readonly
     */
     static BIRCH_FENCE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "birch_fence", "birch_fence", true, true, []);

    /**
     * @readonly
     */
     static BIRCH_FENCE_GATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "birch_fence_gate", "birch_fence_gate", true, true, ["direction", "in_wall_bit", "open_bit"]);

    /**
     * @readonly
     */
     static BIRCH_HANGING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "birch_hanging_sign", "birch_hanging_sign", true, true, ["attached_bit", "facing_direction", "ground_sign_direction", "hanging"]);

    /**
     * @readonly
     */
     static BIRCH_LEAVES = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "birch_leaves", "birch_leaves", true, true, ["persistent_bit", "update_bit"]);

    /**
     * @readonly
     */
     static BIRCH_LOG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "birch_log", "birch_log", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static BIRCH_PLANKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "birch_planks", "birch_planks", true, true, []);

    /**
     * @readonly
     */
     static BIRCH_PRESSURE_PLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "birch_pressure_plate", "birch_pressure_plate", true, true, ["redstone_signal"]);

    /**
     * @readonly
     */
     static BIRCH_SAPLING = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "birch_sapling", "birch_sapling", true, true, ["age_bit"]);

    /**
     * @readonly
     */
     static BIRCH_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "birch_sign", false, true, []);

    /**
     * @readonly
     */
     static BIRCH_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "birch_slab", "birch_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static BIRCH_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "birch_stairs", "birch_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static BIRCH_TRAPDOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "birch_trapdoor", "birch_trapdoor", true, true, ["direction", "open_bit", "upside_down_bit"]);

    /**
     * @readonly
     */
     static BIRCH_WOOD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "birch_wood", "birch_wood", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static BLACK_CANDLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "black_candle", "black_candle", true, true, ["candles", "lit"]);

    /**
     * @readonly
     */
     static BLACK_CARPET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "black_carpet", "black_carpet", true, true, []);

    /**
     * @readonly
     */
     static BLACK_CONCRETE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "black_concrete", "black_concrete", true, true, []);

    /**
     * @readonly
     */
     static BLACK_CONCRETE_POWDER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "black_concrete_powder", "black_concrete_powder", true, true, []);

    /**
     * @readonly
     */
     static BLACK_DYE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "black_dye", false, true, []);

    /**
     * @readonly
     */
     static BLACK_GLAZED_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "black_glazed_terracotta", "black_glazed_terracotta", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static BLACK_SHULKER_BOX = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "black_shulker_box", "black_shulker_box", true, true, []);

    /**
     * @readonly
     */
     static BLACK_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "black_stained_glass", "black_stained_glass", true, true, []);

    /**
     * @readonly
     */
     static BLACK_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "black_stained_glass_pane", "black_stained_glass_pane", true, true, []);

    /**
     * @readonly
     */
     static BLACK_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "black_terracotta", "black_terracotta", true, true, []);

    /**
     * @readonly
     */
     static BLACK_WOOL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "black_wool", "black_wool", true, true, []);

    /**
     * @readonly
     */
     static BLACKSTONE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "blackstone", "blackstone", true, true, []);

    /**
     * @readonly
     */
     static BLACKSTONE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "blackstone_slab", "blackstone_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static BLACKSTONE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "blackstone_stairs", "blackstone_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static BLACKSTONE_WALL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "blackstone_wall", "blackstone_wall", true, true, ["wall_connection_type_east", "wall_connection_type_north", "wall_connection_type_south", "wall_connection_type_west", "wall_post_bit"]);

    /**
     * @readonly
     */
     static BLADE_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "blade_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static BLAST_FURNACE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "blast_furnace", "blast_furnace", true, true, ["minecraft:cardinal_direction"]);

    /**
     * @readonly
     */
     static BLAZE_POWDER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "blaze_powder", false, true, []);

    /**
     * @readonly
     */
     static BLAZE_ROD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "blaze_rod", false, true, []);

    /**
     * @readonly
     */
     static BLAZE_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "blaze_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static BLUE_CANDLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "blue_candle", "blue_candle", true, true, ["candles", "lit"]);

    /**
     * @readonly
     */
     static BLUE_CARPET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "blue_carpet", "blue_carpet", true, true, []);

    /**
     * @readonly
     */
     static BLUE_CONCRETE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "blue_concrete", "blue_concrete", true, true, []);

    /**
     * @readonly
     */
     static BLUE_CONCRETE_POWDER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "blue_concrete_powder", "blue_concrete_powder", true, true, []);

    /**
     * @readonly
     */
     static BLUE_DYE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "blue_dye", false, true, []);

    /**
     * @readonly
     */
     static BLUE_GLAZED_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "blue_glazed_terracotta", "blue_glazed_terracotta", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static BLUE_ICE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "blue_ice", "blue_ice", true, true, []);

    /**
     * @readonly
     */
     static BLUE_ORCHID = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "blue_orchid", "blue_orchid", true, true, []);

    /**
     * @readonly
     */
     static BLUE_SHULKER_BOX = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "blue_shulker_box", "blue_shulker_box", true, true, []);

    /**
     * @readonly
     */
     static BLUE_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "blue_stained_glass", "blue_stained_glass", true, true, []);

    /**
     * @readonly
     */
     static BLUE_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "blue_stained_glass_pane", "blue_stained_glass_pane", true, true, []);

    /**
     * @readonly
     */
     static BLUE_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "blue_terracotta", "blue_terracotta", true, true, []);

    /**
     * @readonly
     */
     static BLUE_WOOL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "blue_wool", "blue_wool", true, true, []);

    /**
     * @readonly
     */
     static BOAT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "boat", false, true, []);

    /**
     * @readonly
     */
     static BOGGED_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "bogged_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static BOLT_ARMOR_TRIM_SMITHING_TEMPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "bolt_armor_trim_smithing_template", false, true, []);

    /**
     * @readonly
     */
     static BONE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "bone", false, true, []);

    /**
     * @readonly
     */
     static BONE_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bone_block", "bone_block", true, true, ["deprecated", "pillar_axis"]);

    /**
     * @readonly
     */
     static BONE_MEAL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "bone_meal", false, true, []);

    /**
     * @readonly
     */
     static BOOK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "book", false, true, []);

    /**
     * @readonly
     */
     static BOOKSHELF = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bookshelf", "bookshelf", true, true, []);

    /**
     * @readonly
     */
     static BORDER_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "border_block", "border_block", true, true, ["wall_connection_type_east", "wall_connection_type_north", "wall_connection_type_south", "wall_connection_type_west", "wall_post_bit"]);

    /**
     * @readonly
     */
     static BORDURE_INDENTED_BANNER_PATTERN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "bordure_indented_banner_pattern", false, true, []);

    /**
     * @readonly
     */
     static BOW = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "bow", false, true, []);

    /**
     * @readonly
     */
     static BOWL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "bowl", false, true, []);

    /**
     * @readonly
     */
     static BRAIN_CORAL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "brain_coral", "brain_coral", true, true, []);

    /**
     * @readonly
     */
     static BRAIN_CORAL_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "brain_coral_block", "brain_coral_block", true, true, []);

    /**
     * @readonly
     */
     static BRAIN_CORAL_FAN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "brain_coral_fan", "brain_coral_fan", true, true, ["coral_fan_direction"]);

    /**
     * @readonly
     */
     static BREAD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "bread", false, true, []);

    /**
     * @readonly
     */
     static BREEZE_ROD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "breeze_rod", false, true, []);

    /**
     * @readonly
     */
     static BREEZE_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "breeze_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static BREWER_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "brewer_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static BREWING_STAND = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "brewing_stand", "brewing_stand", true, true, ["brewing_stand_slot_a_bit", "brewing_stand_slot_b_bit", "brewing_stand_slot_c_bit"]);

    /**
     * @readonly
     */
     static BRICK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "brick", false, true, []);

    /**
     * @readonly
     */
     static BRICK_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "brick_block", "brick_block", true, true, []);

    /**
     * @readonly
     */
     static BRICK_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "brick_slab", "brick_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static BRICK_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "brick_stairs", "brick_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static BROWN_CANDLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "brown_candle", "brown_candle", true, true, ["candles", "lit"]);

    /**
     * @readonly
     */
     static BROWN_CARPET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "brown_carpet", "brown_carpet", true, true, []);

    /**
     * @readonly
     */
     static BROWN_CONCRETE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "brown_concrete", "brown_concrete", true, true, []);

    /**
     * @readonly
     */
     static BROWN_CONCRETE_POWDER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "brown_concrete_powder", "brown_concrete_powder", true, true, []);

    /**
     * @readonly
     */
     static BROWN_DYE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "brown_dye", false, true, []);

    /**
     * @readonly
     */
     static BROWN_GLAZED_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "brown_glazed_terracotta", "brown_glazed_terracotta", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static BROWN_MUSHROOM = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "brown_mushroom", "brown_mushroom", true, true, []);

    /**
     * @readonly
     */
     static BROWN_MUSHROOM_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "brown_mushroom_block", "brown_mushroom_block", true, true, ["huge_mushroom_bits"]);

    /**
     * @readonly
     */
     static BROWN_SHULKER_BOX = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "brown_shulker_box", "brown_shulker_box", true, true, []);

    /**
     * @readonly
     */
     static BROWN_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "brown_stained_glass", "brown_stained_glass", true, true, []);

    /**
     * @readonly
     */
     static BROWN_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "brown_stained_glass_pane", "brown_stained_glass_pane", true, true, []);

    /**
     * @readonly
     */
     static BROWN_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "brown_terracotta", "brown_terracotta", true, true, []);

    /**
     * @readonly
     */
     static BROWN_WOOL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "brown_wool", "brown_wool", true, true, []);

    /**
     * @readonly
     */
     static BRUSH = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "brush", false, true, []);

    /**
     * @readonly
     */
     static BUBBLE_CORAL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bubble_coral", "bubble_coral", true, true, []);

    /**
     * @readonly
     */
     static BUBBLE_CORAL_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bubble_coral_block", "bubble_coral_block", true, true, []);

    /**
     * @readonly
     */
     static BUBBLE_CORAL_FAN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bubble_coral_fan", "bubble_coral_fan", true, true, ["coral_fan_direction"]);

    /**
     * @readonly
     */
     static BUCKET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "bucket", false, true, []);

    /**
     * @readonly
     */
     static BUDDING_AMETHYST = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "budding_amethyst", "budding_amethyst", true, true, []);

    /**
     * @readonly
     */
     static BURN_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "burn_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static CACTUS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cactus", "cactus", true, true, ["age"]);

    /**
     * @readonly
     */
     static CAKE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cake", "cake", true, true, ["bite_counter"]);

    /**
     * @readonly
     */
     static CALCITE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "calcite", "calcite", true, true, []);

    /**
     * @readonly
     */
     static CALIBRATED_SCULK_SENSOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "calibrated_sculk_sensor", "calibrated_sculk_sensor", true, true, ["minecraft:cardinal_direction", "sculk_sensor_phase"]);

    /**
     * @readonly
     */
     static CAMEL_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "camel_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static CAMPFIRE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "campfire", "campfire", true, true, ["extinguished", "minecraft:cardinal_direction"]);

    /**
     * @readonly
     */
     static CANDLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "candle", "candle", true, true, ["candles", "lit"]);

    /**
     * @readonly
     */
     static CARPET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "carpet", false, true, []);

    /**
     * @readonly
     */
     static CARROT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "carrots", "carrot", true, true, ["growth"]);

    /**
     * @readonly
     */
     static CARROT_ON_A_STICK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "carrot_on_a_stick", false, true, []);

    /**
     * @readonly
     */
     static CARTOGRAPHY_TABLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cartography_table", "cartography_table", true, true, []);

    /**
     * @readonly
     */
     static CARVED_PUMPKIN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "carved_pumpkin", "carved_pumpkin", true, true, ["minecraft:cardinal_direction"]);

    /**
     * @readonly
     */
     static CAT_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "cat_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static CAULDRON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cauldron", "cauldron", true, true, ["cauldron_liquid", "fill_level"]);

    /**
     * @readonly
     */
     static CAVE_SPIDER_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "cave_spider_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static CHAIN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "chain", "chain", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static CHAIN_COMMAND_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "chain_command_block", "chain_command_block", true, true, ["conditional_bit", "facing_direction"]);

    /**
     * @readonly
     */
     static CHAINMAIL_BOOTS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "chainmail_boots", false, true, []);

    /**
     * @readonly
     */
     static CHAINMAIL_CHESTPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "chainmail_chestplate", false, true, []);

    /**
     * @readonly
     */
     static CHAINMAIL_HELMET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "chainmail_helmet", false, true, []);

    /**
     * @readonly
     */
     static CHAINMAIL_LEGGINGS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "chainmail_leggings", false, true, []);

    /**
     * @readonly
     */
     static CHARCOAL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "charcoal", false, true, []);

    /**
     * @readonly
     */
     static CHERRY_BOAT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "cherry_boat", false, true, []);

    /**
     * @readonly
     */
     static CHERRY_BUTTON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cherry_button", "cherry_button", true, true, ["button_pressed_bit", "facing_direction"]);

    /**
     * @readonly
     */
     static CHERRY_CHEST_BOAT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "cherry_chest_boat", false, true, []);

    /**
     * @readonly
     */
     static CHERRY_DOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cherry_door", "cherry_door", true, true, ["direction", "door_hinge_bit", "open_bit", "upper_block_bit"]);

    /**
     * @readonly
     */
     static CHERRY_FENCE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cherry_fence", "cherry_fence", true, true, []);

    /**
     * @readonly
     */
     static CHERRY_FENCE_GATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cherry_fence_gate", "cherry_fence_gate", true, true, ["direction", "in_wall_bit", "open_bit"]);

    /**
     * @readonly
     */
     static CHERRY_HANGING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cherry_hanging_sign", "cherry_hanging_sign", true, true, ["attached_bit", "facing_direction", "ground_sign_direction", "hanging"]);

    /**
     * @readonly
     */
     static CHERRY_LEAVES = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cherry_leaves", "cherry_leaves", true, true, ["persistent_bit", "update_bit"]);

    /**
     * @readonly
     */
     static CHERRY_LOG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cherry_log", "cherry_log", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static CHERRY_PLANKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cherry_planks", "cherry_planks", true, true, []);

    /**
     * @readonly
     */
     static CHERRY_PRESSURE_PLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cherry_pressure_plate", "cherry_pressure_plate", true, true, ["redstone_signal"]);

    /**
     * @readonly
     */
     static CHERRY_SAPLING = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cherry_sapling", "cherry_sapling", true, true, ["age_bit"]);

    /**
     * @readonly
     */
     static CHERRY_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "cherry_sign", false, true, []);

    /**
     * @readonly
     */
     static CHERRY_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cherry_slab", "cherry_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static CHERRY_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cherry_stairs", "cherry_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static CHERRY_TRAPDOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cherry_trapdoor", "cherry_trapdoor", true, true, ["direction", "open_bit", "upside_down_bit"]);

    /**
     * @readonly
     */
     static CHERRY_WOOD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cherry_wood", "cherry_wood", true, true, ["pillar_axis", "stripped_bit"]);

    /**
     * @readonly
     */
     static CHEST = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "chest", "chest", true, true, ["minecraft:cardinal_direction"]);

    /**
     * @readonly
     */
     static CHEST_BOAT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "chest_boat", false, true, []);

    /**
     * @readonly
     */
     static CHEST_MINECART = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "chest_minecart", false, true, []);

    /**
     * @readonly
     */
     static CHICKEN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "chicken", false, true, []);

    /**
     * @readonly
     */
     static CHICKEN_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "chicken_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static CHISELED_BOOKSHELF = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "chiseled_bookshelf", "chiseled_bookshelf", true, true, ["books_stored", "direction"]);

    /**
     * @readonly
     */
     static CHISELED_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "chiseled_copper", "chiseled_copper", true, true, []);

    /**
     * @readonly
     */
     static CHISELED_DEEPSLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "chiseled_deepslate", "chiseled_deepslate", true, true, []);

    /**
     * @readonly
     */
     static CHISELED_NETHER_BRICKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "chiseled_nether_bricks", "chiseled_nether_bricks", true, true, []);

    /**
     * @readonly
     */
     static CHISELED_POLISHED_BLACKSTONE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "chiseled_polished_blackstone", "chiseled_polished_blackstone", true, true, []);

    /**
     * @readonly
     */
     static CHISELED_TUFF = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "chiseled_tuff", "chiseled_tuff", true, true, []);

    /**
     * @readonly
     */
     static CHISELED_TUFF_BRICKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "chiseled_tuff_bricks", "chiseled_tuff_bricks", true, true, []);

    /**
     * @readonly
     */
     static CHORUS_FLOWER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "chorus_flower", "chorus_flower", true, true, ["age"]);

    /**
     * @readonly
     */
     static CHORUS_FRUIT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "chorus_plant", "chorus_fruit", true, true, []);

    /**
     * @readonly
     */
     static CHORUS_PLANT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "chorus_plant", "chorus_plant", true, true, []);

    /**
     * @readonly
     */
     static CLAY = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "clay", "clay", true, true, []);

    /**
     * @readonly
     */
     static CLAY_BALL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "clay_ball", false, true, []);

    /**
     * @readonly
     */
     static CLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "clock", false, true, []);

    /**
     * @readonly
     */
     static COAL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "coal", false, true, []);

    /**
     * @readonly
     */
     static COAL_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "coal_block", "coal_block", true, true, []);

    /**
     * @readonly
     */
     static COAL_ORE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "coal_ore", "coal_ore", true, true, []);

    /**
     * @readonly
     */
     static COAST_ARMOR_TRIM_SMITHING_TEMPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "coast_armor_trim_smithing_template", false, true, []);

    /**
     * @readonly
     */
     static COBBLED_DEEPSLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cobbled_deepslate", "cobbled_deepslate", true, true, []);

    /**
     * @readonly
     */
     static COBBLED_DEEPSLATE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cobbled_deepslate_slab", "cobbled_deepslate_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static COBBLED_DEEPSLATE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cobbled_deepslate_stairs", "cobbled_deepslate_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static COBBLED_DEEPSLATE_WALL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cobbled_deepslate_wall", "cobbled_deepslate_wall", true, true, ["wall_connection_type_east", "wall_connection_type_north", "wall_connection_type_south", "wall_connection_type_west", "wall_post_bit"]);

    /**
     * @readonly
     */
     static COBBLESTONE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cobblestone", "cobblestone", true, true, []);

    /**
     * @readonly
     */
     static COBBLESTONE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cobblestone_slab", "cobblestone_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static COBBLESTONE_WALL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cobblestone_wall", "cobblestone_wall", true, true, ["wall_block_type", "wall_connection_type_east", "wall_connection_type_north", "wall_connection_type_south", "wall_connection_type_west", "wall_post_bit"]);

    /**
     * @readonly
     */
     static COCOA_BEANS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "cocoa_beans", false, true, []);

    /**
     * @readonly
     */
     static COD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "cod", false, true, []);

    /**
     * @readonly
     */
     static COD_BUCKET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "flowing_water", "cod_bucket", true, true, []);

    /**
     * @readonly
     */
     static COD_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "cod_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static COMMAND_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "command_block", "command_block", true, true, ["conditional_bit", "facing_direction"]);

    /**
     * @readonly
     */
     static COMMAND_BLOCK_MINECART = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "command_block_minecart", false, true, []);

    /**
     * @readonly
     */
     static COMPARATOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "comparator", false, true, []);

    /**
     * @readonly
     */
     static COMPASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "compass", false, true, []);

    /**
     * @readonly
     */
     static COMPOSTER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "composter", "composter", true, true, ["composter_fill_level"]);

    /**
     * @readonly
     */
     static CONCRETE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "concrete", false, true, []);

    /**
     * @readonly
     */
     static CONCRETE_POWDER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "concrete_powder", false, true, []);

    /**
     * @readonly
     */
     static CONDUIT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "conduit", "conduit", true, true, []);

    /**
     * @readonly
     */
     static COOKED_BEEF = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "cooked_beef", false, true, []);

    /**
     * @readonly
     */
     static COOKED_CHICKEN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "cooked_chicken", false, true, []);

    /**
     * @readonly
     */
     static COOKED_COD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "cooked_cod", false, true, []);

    /**
     * @readonly
     */
     static COOKED_MUTTON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "cooked_mutton", false, true, []);

    /**
     * @readonly
     */
     static COOKED_PORKCHOP = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "cooked_porkchop", false, true, []);

    /**
     * @readonly
     */
     static COOKED_RABBIT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "cooked_rabbit", false, true, []);

    /**
     * @readonly
     */
     static COOKED_SALMON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "cooked_salmon", false, true, []);

    /**
     * @readonly
     */
     static COOKIE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "cookie", false, true, []);

    /**
     * @readonly
     */
     static COPPER_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "copper_block", "copper_block", true, true, []);

    /**
     * @readonly
     */
     static COPPER_BULB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "copper_bulb", "copper_bulb", true, true, ["lit", "powered_bit"]);

    /**
     * @readonly
     */
     static COPPER_DOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "copper_door", "copper_door", true, true, ["direction", "door_hinge_bit", "open_bit", "upper_block_bit"]);

    /**
     * @readonly
     */
     static COPPER_GRATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "copper_grate", "copper_grate", true, true, []);

    /**
     * @readonly
     */
     static COPPER_INGOT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "copper_ingot", false, true, []);

    /**
     * @readonly
     */
     static COPPER_ORE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "copper_ore", "copper_ore", true, true, []);

    /**
     * @readonly
     */
     static COPPER_TRAPDOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "copper_trapdoor", "copper_trapdoor", true, true, ["direction", "open_bit", "upside_down_bit"]);

    /**
     * @readonly
     */
     static CORAL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "coral", false, true, []);

    /**
     * @readonly
     */
     static CORAL_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "coral_block", false, true, []);

    /**
     * @readonly
     */
     static CORAL_FAN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "coral_fan", false, true, []);

    /**
     * @readonly
     */
     static CORAL_FAN_DEAD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "coral_fan_dead", false, true, []);

    /**
     * @readonly
     */
     static CORNFLOWER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cornflower", "cornflower", true, true, []);

    /**
     * @readonly
     */
     static COW_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "cow_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static CRACKED_DEEPSLATE_BRICKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cracked_deepslate_bricks", "cracked_deepslate_bricks", true, true, []);

    /**
     * @readonly
     */
     static CRACKED_DEEPSLATE_TILES = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cracked_deepslate_tiles", "cracked_deepslate_tiles", true, true, []);

    /**
     * @readonly
     */
     static CRACKED_NETHER_BRICKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cracked_nether_bricks", "cracked_nether_bricks", true, true, []);

    /**
     * @readonly
     */
     static CRACKED_POLISHED_BLACKSTONE_BRICKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cracked_polished_blackstone_bricks", "cracked_polished_blackstone_bricks", true, true, []);

    /**
     * @readonly
     */
     static CRAFTER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "crafter", "crafter", true, true, ["crafting", "orientation", "triggered_bit"]);

    /**
     * @readonly
     */
     static CRAFTING_TABLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "crafting_table", "crafting_table", true, true, []);

    /**
     * @readonly
     */
     static CREEPER_BANNER_PATTERN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "creeper_banner_pattern", false, true, []);

    /**
     * @readonly
     */
     static CREEPER_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "creeper_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static CRIMSON_BUTTON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "crimson_button", "crimson_button", true, true, ["button_pressed_bit", "facing_direction"]);

    /**
     * @readonly
     */
     static CRIMSON_DOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "crimson_door", "crimson_door", true, true, ["direction", "door_hinge_bit", "open_bit", "upper_block_bit"]);

    /**
     * @readonly
     */
     static CRIMSON_FENCE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "crimson_fence", "crimson_fence", true, true, []);

    /**
     * @readonly
     */
     static CRIMSON_FENCE_GATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "crimson_fence_gate", "crimson_fence_gate", true, true, ["direction", "in_wall_bit", "open_bit"]);

    /**
     * @readonly
     */
     static CRIMSON_FUNGUS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "crimson_fungus", "crimson_fungus", true, true, []);

    /**
     * @readonly
     */
     static CRIMSON_HANGING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "crimson_hanging_sign", "crimson_hanging_sign", true, true, ["attached_bit", "facing_direction", "ground_sign_direction", "hanging"]);

    /**
     * @readonly
     */
     static CRIMSON_HYPHAE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "crimson_hyphae", "crimson_hyphae", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static CRIMSON_NYLIUM = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "crimson_nylium", "crimson_nylium", true, true, []);

    /**
     * @readonly
     */
     static CRIMSON_PLANKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "crimson_planks", "crimson_planks", true, true, []);

    /**
     * @readonly
     */
     static CRIMSON_PRESSURE_PLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "crimson_pressure_plate", "crimson_pressure_plate", true, true, ["redstone_signal"]);

    /**
     * @readonly
     */
     static CRIMSON_ROOTS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "crimson_roots", "crimson_roots", true, true, []);

    /**
     * @readonly
     */
     static CRIMSON_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "crimson_sign", false, true, []);

    /**
     * @readonly
     */
     static CRIMSON_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "crimson_slab", "crimson_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static CRIMSON_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "crimson_stairs", "crimson_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static CRIMSON_STEM = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "crimson_stem", "crimson_stem", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static CRIMSON_TRAPDOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "crimson_trapdoor", "crimson_trapdoor", true, true, ["direction", "open_bit", "upside_down_bit"]);

    /**
     * @readonly
     */
     static CROSSBOW = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "crossbow", false, true, []);

    /**
     * @readonly
     */
     static CRYING_OBSIDIAN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "crying_obsidian", "crying_obsidian", true, true, []);

    /**
     * @readonly
     */
     static CUT_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cut_copper", "cut_copper", true, true, []);

    /**
     * @readonly
     */
     static CUT_COPPER_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cut_copper_slab", "cut_copper_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static CUT_COPPER_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cut_copper_stairs", "cut_copper_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static CYAN_CANDLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cyan_candle", "cyan_candle", true, true, ["candles", "lit"]);

    /**
     * @readonly
     */
     static CYAN_CARPET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cyan_carpet", "cyan_carpet", true, true, []);

    /**
     * @readonly
     */
     static CYAN_CONCRETE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cyan_concrete", "cyan_concrete", true, true, []);

    /**
     * @readonly
     */
     static CYAN_CONCRETE_POWDER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cyan_concrete_powder", "cyan_concrete_powder", true, true, []);

    /**
     * @readonly
     */
     static CYAN_DYE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "cyan_dye", false, true, []);

    /**
     * @readonly
     */
     static CYAN_GLAZED_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cyan_glazed_terracotta", "cyan_glazed_terracotta", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static CYAN_SHULKER_BOX = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cyan_shulker_box", "cyan_shulker_box", true, true, []);

    /**
     * @readonly
     */
     static CYAN_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cyan_stained_glass", "cyan_stained_glass", true, true, []);

    /**
     * @readonly
     */
     static CYAN_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cyan_stained_glass_pane", "cyan_stained_glass_pane", true, true, []);

    /**
     * @readonly
     */
     static CYAN_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cyan_terracotta", "cyan_terracotta", true, true, []);

    /**
     * @readonly
     */
     static CYAN_WOOL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cyan_wool", "cyan_wool", true, true, []);

    /**
     * @readonly
     */
     static DANGER_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "danger_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static DARK_OAK_BOAT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "dark_oak_boat", false, true, []);

    /**
     * @readonly
     */
     static DARK_OAK_BUTTON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dark_oak_button", "dark_oak_button", true, true, ["button_pressed_bit", "facing_direction"]);

    /**
     * @readonly
     */
     static DARK_OAK_CHEST_BOAT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "dark_oak_chest_boat", false, true, []);

    /**
     * @readonly
     */
     static DARK_OAK_DOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dark_oak_door", "dark_oak_door", true, true, ["direction", "door_hinge_bit", "open_bit", "upper_block_bit"]);

    /**
     * @readonly
     */
     static DARK_OAK_FENCE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dark_oak_fence", "dark_oak_fence", true, true, []);

    /**
     * @readonly
     */
     static DARK_OAK_FENCE_GATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dark_oak_fence_gate", "dark_oak_fence_gate", true, true, ["direction", "in_wall_bit", "open_bit"]);

    /**
     * @readonly
     */
     static DARK_OAK_HANGING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dark_oak_hanging_sign", "dark_oak_hanging_sign", true, true, ["attached_bit", "facing_direction", "ground_sign_direction", "hanging"]);

    /**
     * @readonly
     */
     static DARK_OAK_LEAVES = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dark_oak_leaves", "dark_oak_leaves", true, true, ["persistent_bit", "update_bit"]);

    /**
     * @readonly
     */
     static DARK_OAK_LOG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dark_oak_log", "dark_oak_log", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static DARK_OAK_PLANKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dark_oak_planks", "dark_oak_planks", true, true, []);

    /**
     * @readonly
     */
     static DARK_OAK_PRESSURE_PLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dark_oak_pressure_plate", "dark_oak_pressure_plate", true, true, ["redstone_signal"]);

    /**
     * @readonly
     */
     static DARK_OAK_SAPLING = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dark_oak_sapling", "dark_oak_sapling", true, true, ["age_bit"]);

    /**
     * @readonly
     */
     static DARK_OAK_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "dark_oak_sign", false, true, []);

    /**
     * @readonly
     */
     static DARK_OAK_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dark_oak_slab", "dark_oak_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static DARK_OAK_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dark_oak_stairs", "dark_oak_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static DARK_OAK_TRAPDOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dark_oak_trapdoor", "dark_oak_trapdoor", true, true, ["direction", "open_bit", "upside_down_bit"]);

    /**
     * @readonly
     */
     static DARK_OAK_WOOD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dark_oak_wood", "dark_oak_wood", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static DARK_PRISMARINE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dark_prismarine_stairs", "dark_prismarine_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static DAYLIGHT_DETECTOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "daylight_detector", "daylight_detector", true, true, ["redstone_signal"]);

    /**
     * @readonly
     */
     static DEAD_BRAIN_CORAL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dead_brain_coral", "dead_brain_coral", true, true, []);

    /**
     * @readonly
     */
     static DEAD_BRAIN_CORAL_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dead_brain_coral_block", "dead_brain_coral_block", true, true, []);

    /**
     * @readonly
     */
     static DEAD_BRAIN_CORAL_FAN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dead_brain_coral_fan", "dead_brain_coral_fan", true, true, ["coral_fan_direction"]);

    /**
     * @readonly
     */
     static DEAD_BUBBLE_CORAL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dead_bubble_coral", "dead_bubble_coral", true, true, []);

    /**
     * @readonly
     */
     static DEAD_BUBBLE_CORAL_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dead_bubble_coral_block", "dead_bubble_coral_block", true, true, []);

    /**
     * @readonly
     */
     static DEAD_BUBBLE_CORAL_FAN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dead_bubble_coral_fan", "dead_bubble_coral_fan", true, true, ["coral_fan_direction"]);

    /**
     * @readonly
     */
     static DEAD_FIRE_CORAL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dead_fire_coral", "dead_fire_coral", true, true, []);

    /**
     * @readonly
     */
     static DEAD_FIRE_CORAL_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dead_fire_coral_block", "dead_fire_coral_block", true, true, []);

    /**
     * @readonly
     */
     static DEAD_FIRE_CORAL_FAN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dead_fire_coral_fan", "dead_fire_coral_fan", true, true, ["coral_fan_direction"]);

    /**
     * @readonly
     */
     static DEAD_HORN_CORAL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dead_horn_coral", "dead_horn_coral", true, true, []);

    /**
     * @readonly
     */
     static DEAD_HORN_CORAL_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dead_horn_coral_block", "dead_horn_coral_block", true, true, []);

    /**
     * @readonly
     */
     static DEAD_HORN_CORAL_FAN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dead_horn_coral_fan", "dead_horn_coral_fan", true, true, ["coral_fan_direction"]);

    /**
     * @readonly
     */
     static DEAD_TUBE_CORAL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dead_tube_coral", "dead_tube_coral", true, true, []);

    /**
     * @readonly
     */
     static DEAD_TUBE_CORAL_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dead_tube_coral_block", "dead_tube_coral_block", true, true, []);

    /**
     * @readonly
     */
     static DEAD_TUBE_CORAL_FAN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dead_tube_coral_fan", "dead_tube_coral_fan", true, true, ["coral_fan_direction"]);

    /**
     * @readonly
     */
     static DEADBUSH = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "deadbush", "deadbush", true, true, []);

    /**
     * @readonly
     */
     static DECORATED_POT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "decorated_pot", "decorated_pot", true, true, ["direction"]);

    /**
     * @readonly
     */
     static DEEPSLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "deepslate", "deepslate", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static DEEPSLATE_BRICK_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "deepslate_brick_slab", "deepslate_brick_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static DEEPSLATE_BRICK_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "deepslate_brick_stairs", "deepslate_brick_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static DEEPSLATE_BRICK_WALL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "deepslate_brick_wall", "deepslate_brick_wall", true, true, ["wall_connection_type_east", "wall_connection_type_north", "wall_connection_type_south", "wall_connection_type_west", "wall_post_bit"]);

    /**
     * @readonly
     */
     static DEEPSLATE_BRICKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "deepslate_bricks", "deepslate_bricks", true, true, []);

    /**
     * @readonly
     */
     static DEEPSLATE_COAL_ORE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "deepslate_coal_ore", "deepslate_coal_ore", true, true, []);

    /**
     * @readonly
     */
     static DEEPSLATE_COPPER_ORE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "deepslate_copper_ore", "deepslate_copper_ore", true, true, []);

    /**
     * @readonly
     */
     static DEEPSLATE_DIAMOND_ORE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "deepslate_diamond_ore", "deepslate_diamond_ore", true, true, []);

    /**
     * @readonly
     */
     static DEEPSLATE_EMERALD_ORE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "deepslate_emerald_ore", "deepslate_emerald_ore", true, true, []);

    /**
     * @readonly
     */
     static DEEPSLATE_GOLD_ORE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "deepslate_gold_ore", "deepslate_gold_ore", true, true, []);

    /**
     * @readonly
     */
     static DEEPSLATE_IRON_ORE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "deepslate_iron_ore", "deepslate_iron_ore", true, true, []);

    /**
     * @readonly
     */
     static DEEPSLATE_LAPIS_ORE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "deepslate_lapis_ore", "deepslate_lapis_ore", true, true, []);

    /**
     * @readonly
     */
     static DEEPSLATE_REDSTONE_ORE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "deepslate_redstone_ore", "deepslate_redstone_ore", true, true, []);

    /**
     * @readonly
     */
     static DEEPSLATE_TILE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "deepslate_tile_slab", "deepslate_tile_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static DEEPSLATE_TILE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "deepslate_tile_stairs", "deepslate_tile_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static DEEPSLATE_TILE_WALL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "deepslate_tile_wall", "deepslate_tile_wall", true, true, ["wall_connection_type_east", "wall_connection_type_north", "wall_connection_type_south", "wall_connection_type_west", "wall_post_bit"]);

    /**
     * @readonly
     */
     static DEEPSLATE_TILES = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "deepslate_tiles", "deepslate_tiles", true, true, []);

    /**
     * @readonly
     */
     static DENY = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "deny", "deny", true, true, []);

    /**
     * @readonly
     */
     static DETECTOR_RAIL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "detector_rail", "detector_rail", true, true, ["rail_data_bit", "rail_direction"]);

    /**
     * @readonly
     */
     static DIAMOND = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "diamond", false, true, []);

    /**
     * @readonly
     */
     static DIAMOND_AXE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "diamond_axe", false, true, []);

    /**
     * @readonly
     */
     static DIAMOND_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "diamond_block", "diamond_block", true, true, []);

    /**
     * @readonly
     */
     static DIAMOND_BOOTS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "diamond_boots", false, true, []);

    /**
     * @readonly
     */
     static DIAMOND_CHESTPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "diamond_chestplate", false, true, []);

    /**
     * @readonly
     */
     static DIAMOND_HELMET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "diamond_helmet", false, true, []);

    /**
     * @readonly
     */
     static DIAMOND_HOE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "diamond_hoe", false, true, []);

    /**
     * @readonly
     */
     static DIAMOND_HORSE_ARMOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "diamond_horse_armor", false, true, []);

    /**
     * @readonly
     */
     static DIAMOND_LEGGINGS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "diamond_leggings", false, true, []);

    /**
     * @readonly
     */
     static DIAMOND_ORE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "diamond_ore", "diamond_ore", true, true, []);

    /**
     * @readonly
     */
     static DIAMOND_PICKAXE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "diamond_pickaxe", false, true, []);

    /**
     * @readonly
     */
     static DIAMOND_SHOVEL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "diamond_shovel", false, true, []);

    /**
     * @readonly
     */
     static DIAMOND_SWORD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "diamond_sword", false, true, []);

    /**
     * @readonly
     */
     static DIORITE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "diorite", "diorite", true, true, []);

    /**
     * @readonly
     */
     static DIORITE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "diorite_stairs", "diorite_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static DIRT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dirt", "dirt", true, true, ["dirt_type"]);

    /**
     * @readonly
     */
     static DIRT_WITH_ROOTS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dirt_with_roots", "dirt_with_roots", true, true, []);

    /**
     * @readonly
     */
     static DISC_FRAGMENT_5 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "disc_fragment_5", false, true, []);

    /**
     * @readonly
     */
     static DISPENSER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dispenser", "dispenser", true, true, ["facing_direction", "triggered_bit"]);

    /**
     * @readonly
     */
     static DOLPHIN_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "dolphin_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static DONKEY_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "donkey_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static DOUBLE_PLANT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "double_plant", false, true, []);

    /**
     * @readonly
     */
     static DRAGON_BREATH = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "dragon_breath", false, true, []);

    /**
     * @readonly
     */
     static DRAGON_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dragon_egg", "dragon_egg", true, true, []);

    /**
     * @readonly
     */
     static DRIED_KELP = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "dried_kelp", false, true, []);

    /**
     * @readonly
     */
     static DRIED_KELP_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dried_kelp_block", "dried_kelp_block", true, true, []);

    /**
     * @readonly
     */
     static DRIPSTONE_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dripstone_block", "dripstone_block", true, true, []);

    /**
     * @readonly
     */
     static DROPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dropper", "dropper", true, true, ["facing_direction", "triggered_bit"]);

    /**
     * @readonly
     */
     static DROWNED_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "drowned_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static DUNE_ARMOR_TRIM_SMITHING_TEMPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "dune_armor_trim_smithing_template", false, true, []);

    /**
     * @readonly
     */
     static DYE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "dye", false, true, []);

    /**
     * @readonly
     */
     static ECHO_SHARD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "echo_shard", false, true, []);

    /**
     * @readonly
     */
     static EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "egg", false, true, []);

    /**
     * @readonly
     */
     static ELDER_GUARDIAN_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "elder_guardian_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static ELYTRA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "elytra", false, true, []);

    /**
     * @readonly
     */
     static EMERALD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "emerald", false, true, []);

    /**
     * @readonly
     */
     static EMERALD_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "emerald_block", "emerald_block", true, true, []);

    /**
     * @readonly
     */
     static EMERALD_ORE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "emerald_ore", "emerald_ore", true, true, []);

    /**
     * @readonly
     */
     static EMPTY_MAP = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "empty_map", false, true, []);

    /**
     * @readonly
     */
     static ENCHANTED_BOOK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "enchanted_book", false, true, []);

    /**
     * @readonly
     */
     static ENCHANTED_GOLDEN_APPLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "enchanted_golden_apple", false, true, []);

    /**
     * @readonly
     */
     static ENCHANTING_TABLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "enchanting_table", "enchanting_table", true, true, []);

    /**
     * @readonly
     */
     static END_BRICK_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "end_brick_stairs", "end_brick_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static END_BRICKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "end_bricks", "end_bricks", true, true, []);

    /**
     * @readonly
     */
     static END_CRYSTAL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "end_crystal", false, true, []);

    /**
     * @readonly
     */
     static END_PORTAL_FRAME = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "end_portal_frame", "end_portal_frame", true, true, ["end_portal_eye_bit", "minecraft:cardinal_direction"]);

    /**
     * @readonly
     */
     static END_ROD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "end_rod", "end_rod", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static END_STONE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "end_stone", "end_stone", true, true, []);

    /**
     * @readonly
     */
     static ENDER_CHEST = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "ender_chest", "ender_chest", true, true, ["minecraft:cardinal_direction"]);

    /**
     * @readonly
     */
     static ENDER_DRAGON_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "ender_dragon_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static ENDER_EYE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "ender_eye", false, true, []);

    /**
     * @readonly
     */
     static ENDER_PEARL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "ender_pearl", false, true, []);

    /**
     * @readonly
     */
     static ENDERMAN_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "enderman_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static ENDERMITE_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "endermite_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static EVOKER_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "evoker_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static EXPERIENCE_BOTTLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "experience_bottle", false, true, []);

    /**
     * @readonly
     */
     static EXPLORER_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "explorer_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static EXPOSED_CHISELED_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "exposed_chiseled_copper", "exposed_chiseled_copper", true, true, []);

    /**
     * @readonly
     */
     static EXPOSED_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "exposed_copper", "exposed_copper", true, true, []);

    /**
     * @readonly
     */
     static EXPOSED_COPPER_BULB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "exposed_copper_bulb", "exposed_copper_bulb", true, true, ["lit", "powered_bit"]);

    /**
     * @readonly
     */
     static EXPOSED_COPPER_DOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "exposed_copper_door", "exposed_copper_door", true, true, ["direction", "door_hinge_bit", "open_bit", "upper_block_bit"]);

    /**
     * @readonly
     */
     static EXPOSED_COPPER_GRATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "exposed_copper_grate", "exposed_copper_grate", true, true, []);

    /**
     * @readonly
     */
     static EXPOSED_COPPER_TRAPDOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "exposed_copper_trapdoor", "exposed_copper_trapdoor", true, true, ["direction", "open_bit", "upside_down_bit"]);

    /**
     * @readonly
     */
     static EXPOSED_CUT_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "exposed_cut_copper", "exposed_cut_copper", true, true, []);

    /**
     * @readonly
     */
     static EXPOSED_CUT_COPPER_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "exposed_cut_copper_slab", "exposed_cut_copper_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static EXPOSED_CUT_COPPER_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "exposed_cut_copper_stairs", "exposed_cut_copper_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static EYE_ARMOR_TRIM_SMITHING_TEMPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "eye_armor_trim_smithing_template", false, true, []);

    /**
     * @readonly
     */
     static FARMLAND = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "farmland", "farmland", true, true, ["moisturized_amount"]);

    /**
     * @readonly
     */
     static FEATHER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "feather", false, true, []);

    /**
     * @readonly
     */
     static FENCE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "fence", false, true, []);

    /**
     * @readonly
     */
     static FENCE_GATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "fence_gate", "fence_gate", true, true, ["direction", "in_wall_bit", "open_bit"]);

    /**
     * @readonly
     */
     static FERMENTED_SPIDER_EYE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "fermented_spider_eye", false, true, []);

    /**
     * @readonly
     */
     static FERN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "fern", "fern", true, true, []);

    /**
     * @readonly
     */
     static FIELD_MASONED_BANNER_PATTERN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "field_masoned_banner_pattern", false, true, []);

    /**
     * @readonly
     */
     static FILLED_MAP = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "filled_map", false, true, []);

    /**
     * @readonly
     */
     static FIRE_CHARGE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "fire", "fire_charge", true, true, []);

    /**
     * @readonly
     */
     static FIRE_CORAL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "fire_coral", "fire_coral", true, true, []);

    /**
     * @readonly
     */
     static FIRE_CORAL_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "fire_coral_block", "fire_coral_block", true, true, []);

    /**
     * @readonly
     */
     static FIRE_CORAL_FAN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "fire_coral_fan", "fire_coral_fan", true, true, ["coral_fan_direction"]);

    /**
     * @readonly
     */
     static FIREWORK_ROCKET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "firework_rocket", false, true, []);

    /**
     * @readonly
     */
     static FIREWORK_STAR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "firework_star", false, true, []);

    /**
     * @readonly
     */
     static FISHING_ROD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "fishing_rod", false, true, []);

    /**
     * @readonly
     */
     static FLETCHING_TABLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "fletching_table", "fletching_table", true, true, []);

    /**
     * @readonly
     */
     static FLINT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "flint", false, true, []);

    /**
     * @readonly
     */
     static FLINT_AND_STEEL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "fire", "flint_and_steel", true, true, []);

    /**
     * @readonly
     */
     static FLOW_ARMOR_TRIM_SMITHING_TEMPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "flow_armor_trim_smithing_template", false, true, []);

    /**
     * @readonly
     */
     static FLOW_BANNER_PATTERN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "flow_banner_pattern", false, true, []);

    /**
     * @readonly
     */
     static FLOW_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "flow_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static FLOWER_BANNER_PATTERN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "flower_banner_pattern", false, true, []);

    /**
     * @readonly
     */
     static FLOWER_POT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "flower_pot", "flower_pot", true, true, ["update_bit"]);

    /**
     * @readonly
     */
     static FLOWERING_AZALEA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "flowering_azalea", "flowering_azalea", true, true, []);

    /**
     * @readonly
     */
     static FOX_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "fox_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static FRAME = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "frame", "frame", true, true, ["facing_direction", "item_frame_map_bit", "item_frame_photo_bit"]);

    /**
     * @readonly
     */
     static FRIEND_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "friend_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static FROG_SPAWN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "frog_spawn", "frog_spawn", true, true, []);

    /**
     * @readonly
     */
     static FROG_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "frog_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static FROSTED_ICE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "frosted_ice", "frosted_ice", true, true, ["age"]);

    /**
     * @readonly
     */
     static FURNACE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "furnace", "furnace", true, true, ["minecraft:cardinal_direction"]);

    /**
     * @readonly
     */
     static GHAST_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "ghast_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static GHAST_TEAR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "ghast_tear", false, true, []);

    /**
     * @readonly
     */
     static GILDED_BLACKSTONE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "gilded_blackstone", "gilded_blackstone", true, true, []);

    /**
     * @readonly
     */
     static GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "glass", "glass", true, true, []);

    /**
     * @readonly
     */
     static GLASS_BOTTLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "glass_bottle", false, true, []);

    /**
     * @readonly
     */
     static GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "glass_pane", "glass_pane", true, true, []);

    /**
     * @readonly
     */
     static GLISTERING_MELON_SLICE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "glistering_melon_slice", false, true, []);

    /**
     * @readonly
     */
     static GLOBE_BANNER_PATTERN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "globe_banner_pattern", false, true, []);

    /**
     * @readonly
     */
     static GLOW_BERRIES = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "glow_berries", false, true, []);

    /**
     * @readonly
     */
     static GLOW_FRAME = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "glow_frame", "glow_frame", true, true, ["facing_direction", "item_frame_map_bit", "item_frame_photo_bit"]);

    /**
     * @readonly
     */
     static GLOW_INK_SAC = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "glow_ink_sac", false, true, []);

    /**
     * @readonly
     */
     static GLOW_LICHEN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "glow_lichen", "glow_lichen", true, true, ["multi_face_direction_bits"]);

    /**
     * @readonly
     */
     static GLOW_SQUID_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "glow_squid_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static GLOWSTONE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "glowstone", "glowstone", true, true, []);

    /**
     * @readonly
     */
     static GLOWSTONE_DUST = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "glowstone_dust", false, true, []);

    /**
     * @readonly
     */
     static GOAT_HORN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "goat_horn", false, true, []);

    /**
     * @readonly
     */
     static GOAT_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "goat_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static GOLD_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "gold_block", "gold_block", true, true, []);

    /**
     * @readonly
     */
     static GOLD_INGOT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "gold_ingot", false, true, []);

    /**
     * @readonly
     */
     static GOLD_NUGGET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "gold_nugget", false, true, []);

    /**
     * @readonly
     */
     static GOLD_ORE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "gold_ore", "gold_ore", true, true, []);

    /**
     * @readonly
     */
     static GOLDEN_APPLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "golden_apple", false, true, []);

    /**
     * @readonly
     */
     static GOLDEN_AXE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "golden_axe", false, true, []);

    /**
     * @readonly
     */
     static GOLDEN_BOOTS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "golden_boots", false, true, []);

    /**
     * @readonly
     */
     static GOLDEN_CARROT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "golden_carrot", false, true, []);

    /**
     * @readonly
     */
     static GOLDEN_CHESTPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "golden_chestplate", false, true, []);

    /**
     * @readonly
     */
     static GOLDEN_HELMET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "golden_helmet", false, true, []);

    /**
     * @readonly
     */
     static GOLDEN_HOE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "golden_hoe", false, true, []);

    /**
     * @readonly
     */
     static GOLDEN_HORSE_ARMOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "golden_horse_armor", false, true, []);

    /**
     * @readonly
     */
     static GOLDEN_LEGGINGS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "golden_leggings", false, true, []);

    /**
     * @readonly
     */
     static GOLDEN_PICKAXE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "golden_pickaxe", false, true, []);

    /**
     * @readonly
     */
     static GOLDEN_RAIL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "golden_rail", "golden_rail", true, true, ["rail_data_bit", "rail_direction"]);

    /**
     * @readonly
     */
     static GOLDEN_SHOVEL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "golden_shovel", false, true, []);

    /**
     * @readonly
     */
     static GOLDEN_SWORD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "golden_sword", false, true, []);

    /**
     * @readonly
     */
     static GRANITE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "granite", "granite", true, true, []);

    /**
     * @readonly
     */
     static GRANITE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "granite_stairs", "granite_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static GRASS_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "grass_block", "grass_block", true, true, []);

    /**
     * @readonly
     */
     static GRASS_PATH = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "grass_path", "grass_path", true, true, []);

    /**
     * @readonly
     */
     static GRAVEL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "gravel", "gravel", true, true, []);

    /**
     * @readonly
     */
     static GRAY_CANDLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "gray_candle", "gray_candle", true, true, ["candles", "lit"]);

    /**
     * @readonly
     */
     static GRAY_CARPET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "gray_carpet", "gray_carpet", true, true, []);

    /**
     * @readonly
     */
     static GRAY_CONCRETE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "gray_concrete", "gray_concrete", true, true, []);

    /**
     * @readonly
     */
     static GRAY_CONCRETE_POWDER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "gray_concrete_powder", "gray_concrete_powder", true, true, []);

    /**
     * @readonly
     */
     static GRAY_DYE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "gray_dye", false, true, []);

    /**
     * @readonly
     */
     static GRAY_GLAZED_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "gray_glazed_terracotta", "gray_glazed_terracotta", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static GRAY_SHULKER_BOX = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "gray_shulker_box", "gray_shulker_box", true, true, []);

    /**
     * @readonly
     */
     static GRAY_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "gray_stained_glass", "gray_stained_glass", true, true, []);

    /**
     * @readonly
     */
     static GRAY_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "gray_stained_glass_pane", "gray_stained_glass_pane", true, true, []);

    /**
     * @readonly
     */
     static GRAY_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "gray_terracotta", "gray_terracotta", true, true, []);

    /**
     * @readonly
     */
     static GRAY_WOOL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "gray_wool", "gray_wool", true, true, []);

    /**
     * @readonly
     */
     static GREEN_CANDLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "green_candle", "green_candle", true, true, ["candles", "lit"]);

    /**
     * @readonly
     */
     static GREEN_CARPET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "green_carpet", "green_carpet", true, true, []);

    /**
     * @readonly
     */
     static GREEN_CONCRETE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "green_concrete", "green_concrete", true, true, []);

    /**
     * @readonly
     */
     static GREEN_CONCRETE_POWDER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "green_concrete_powder", "green_concrete_powder", true, true, []);

    /**
     * @readonly
     */
     static GREEN_DYE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "green_dye", false, true, []);

    /**
     * @readonly
     */
     static GREEN_GLAZED_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "green_glazed_terracotta", "green_glazed_terracotta", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static GREEN_SHULKER_BOX = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "green_shulker_box", "green_shulker_box", true, true, []);

    /**
     * @readonly
     */
     static GREEN_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "green_stained_glass", "green_stained_glass", true, true, []);

    /**
     * @readonly
     */
     static GREEN_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "green_stained_glass_pane", "green_stained_glass_pane", true, true, []);

    /**
     * @readonly
     */
     static GREEN_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "green_terracotta", "green_terracotta", true, true, []);

    /**
     * @readonly
     */
     static GREEN_WOOL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "green_wool", "green_wool", true, true, []);

    /**
     * @readonly
     */
     static GRINDSTONE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "grindstone", "grindstone", true, true, ["attachment", "direction"]);

    /**
     * @readonly
     */
     static GUARDIAN_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "guardian_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static GUNPOWDER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "gunpowder", false, true, []);

    /**
     * @readonly
     */
     static GUSTER_BANNER_PATTERN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "guster_banner_pattern", false, true, []);

    /**
     * @readonly
     */
     static GUSTER_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "guster_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static HANGING_ROOTS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hanging_roots", "hanging_roots", true, true, []);

    /**
     * @readonly
     */
     static HARD_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "hard_stained_glass", false, true, []);

    /**
     * @readonly
     */
     static HARD_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "hard_stained_glass_pane", false, true, []);

    /**
     * @readonly
     */
     static HARDENED_CLAY = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hardened_clay", "hardened_clay", true, true, []);

    /**
     * @readonly
     */
     static HAY_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hay_block", "hay_block", true, true, ["deprecated", "pillar_axis"]);

    /**
     * @readonly
     */
     static HEART_OF_THE_SEA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "heart_of_the_sea", false, true, []);

    /**
     * @readonly
     */
     static HEART_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "heart_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static HEARTBREAK_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "heartbreak_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static HEAVY_CORE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "heavy_core", "heavy_core", true, true, []);

    /**
     * @readonly
     */
     static HEAVY_WEIGHTED_PRESSURE_PLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "heavy_weighted_pressure_plate", "heavy_weighted_pressure_plate", true, true, ["redstone_signal"]);

    /**
     * @readonly
     */
     static HOGLIN_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "hoglin_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static HONEY_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "honey_block", "honey_block", true, true, []);

    /**
     * @readonly
     */
     static HONEY_BOTTLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "honey_bottle", false, true, []);

    /**
     * @readonly
     */
     static HONEYCOMB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "honeycomb", false, true, []);

    /**
     * @readonly
     */
     static HONEYCOMB_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "honeycomb_block", "honeycomb_block", true, true, []);

    /**
     * @readonly
     */
     static HOPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hopper", "hopper", true, true, ["facing_direction", "toggle_bit"]);

    /**
     * @readonly
     */
     static HOPPER_MINECART = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "hopper_minecart", false, true, []);

    /**
     * @readonly
     */
     static HORN_CORAL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "horn_coral", "horn_coral", true, true, []);

    /**
     * @readonly
     */
     static HORN_CORAL_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "horn_coral_block", "horn_coral_block", true, true, []);

    /**
     * @readonly
     */
     static HORN_CORAL_FAN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "horn_coral_fan", "horn_coral_fan", true, true, ["coral_fan_direction"]);

    /**
     * @readonly
     */
     static HORSE_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "horse_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static HOST_ARMOR_TRIM_SMITHING_TEMPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "host_armor_trim_smithing_template", false, true, []);

    /**
     * @readonly
     */
     static HOWL_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "howl_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static HUSK_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "husk_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static ICE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "ice", "ice", true, true, []);

    /**
     * @readonly
     */
     static INFESTED_DEEPSLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "infested_deepslate", "infested_deepslate", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static INK_SAC = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "ink_sac", false, true, []);

    /**
     * @readonly
     */
     static IRON_AXE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "iron_axe", false, true, []);

    /**
     * @readonly
     */
     static IRON_BARS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "iron_bars", "iron_bars", true, true, []);

    /**
     * @readonly
     */
     static IRON_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "iron_block", "iron_block", true, true, []);

    /**
     * @readonly
     */
     static IRON_BOOTS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "iron_boots", false, true, []);

    /**
     * @readonly
     */
     static IRON_CHESTPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "iron_chestplate", false, true, []);

    /**
     * @readonly
     */
     static IRON_DOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "iron_door", "iron_door", true, true, ["direction", "door_hinge_bit", "open_bit", "upper_block_bit"]);

    /**
     * @readonly
     */
     static IRON_GOLEM_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "iron_golem_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static IRON_HELMET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "iron_helmet", false, true, []);

    /**
     * @readonly
     */
     static IRON_HOE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "iron_hoe", false, true, []);

    /**
     * @readonly
     */
     static IRON_HORSE_ARMOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "iron_horse_armor", false, true, []);

    /**
     * @readonly
     */
     static IRON_INGOT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "iron_ingot", false, true, []);

    /**
     * @readonly
     */
     static IRON_LEGGINGS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "iron_leggings", false, true, []);

    /**
     * @readonly
     */
     static IRON_NUGGET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "iron_nugget", false, true, []);

    /**
     * @readonly
     */
     static IRON_ORE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "iron_ore", "iron_ore", true, true, []);

    /**
     * @readonly
     */
     static IRON_PICKAXE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "iron_pickaxe", false, true, []);

    /**
     * @readonly
     */
     static IRON_SHOVEL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "iron_shovel", false, true, []);

    /**
     * @readonly
     */
     static IRON_SWORD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "iron_sword", false, true, []);

    /**
     * @readonly
     */
     static IRON_TRAPDOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "iron_trapdoor", "iron_trapdoor", true, true, ["direction", "open_bit", "upside_down_bit"]);

    /**
     * @readonly
     */
     static JIGSAW = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "jigsaw", "jigsaw", true, true, ["facing_direction", "rotation"]);

    /**
     * @readonly
     */
     static JUKEBOX = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "jukebox", "jukebox", true, true, []);

    /**
     * @readonly
     */
     static JUNGLE_BOAT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "jungle_boat", false, true, []);

    /**
     * @readonly
     */
     static JUNGLE_BUTTON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "jungle_button", "jungle_button", true, true, ["button_pressed_bit", "facing_direction"]);

    /**
     * @readonly
     */
     static JUNGLE_CHEST_BOAT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "jungle_chest_boat", false, true, []);

    /**
     * @readonly
     */
     static JUNGLE_DOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "jungle_door", "jungle_door", true, true, ["direction", "door_hinge_bit", "open_bit", "upper_block_bit"]);

    /**
     * @readonly
     */
     static JUNGLE_FENCE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "jungle_fence", "jungle_fence", true, true, []);

    /**
     * @readonly
     */
     static JUNGLE_FENCE_GATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "jungle_fence_gate", "jungle_fence_gate", true, true, ["direction", "in_wall_bit", "open_bit"]);

    /**
     * @readonly
     */
     static JUNGLE_HANGING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "jungle_hanging_sign", "jungle_hanging_sign", true, true, ["attached_bit", "facing_direction", "ground_sign_direction", "hanging"]);

    /**
     * @readonly
     */
     static JUNGLE_LEAVES = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "jungle_leaves", "jungle_leaves", true, true, ["persistent_bit", "update_bit"]);

    /**
     * @readonly
     */
     static JUNGLE_LOG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "jungle_log", "jungle_log", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static JUNGLE_PLANKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "jungle_planks", "jungle_planks", true, true, []);

    /**
     * @readonly
     */
     static JUNGLE_PRESSURE_PLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "jungle_pressure_plate", "jungle_pressure_plate", true, true, ["redstone_signal"]);

    /**
     * @readonly
     */
     static JUNGLE_SAPLING = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "jungle_sapling", "jungle_sapling", true, true, ["age_bit"]);

    /**
     * @readonly
     */
     static JUNGLE_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "jungle_sign", false, true, []);

    /**
     * @readonly
     */
     static JUNGLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "jungle_slab", "jungle_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static JUNGLE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "jungle_stairs", "jungle_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static JUNGLE_TRAPDOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "jungle_trapdoor", "jungle_trapdoor", true, true, ["direction", "open_bit", "upside_down_bit"]);

    /**
     * @readonly
     */
     static JUNGLE_WOOD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "jungle_wood", "jungle_wood", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static KELP = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "kelp", "kelp", true, true, ["kelp_age"]);

    /**
     * @readonly
     */
     static LADDER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "ladder", "ladder", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static LANTERN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lantern", "lantern", true, true, ["hanging"]);

    /**
     * @readonly
     */
     static LAPIS_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lapis_block", "lapis_block", true, true, []);

    /**
     * @readonly
     */
     static LAPIS_LAZULI = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "lapis_lazuli", false, true, []);

    /**
     * @readonly
     */
     static LAPIS_ORE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lapis_ore", "lapis_ore", true, true, []);

    /**
     * @readonly
     */
     static LARGE_AMETHYST_BUD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "large_amethyst_bud", "large_amethyst_bud", true, true, ["minecraft:block_face"]);

    /**
     * @readonly
     */
     static LARGE_FERN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "large_fern", "large_fern", true, true, ["upper_block_bit"]);

    /**
     * @readonly
     */
     static LAVA_BUCKET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "flowing_lava", "lava_bucket", true, true, []);

    /**
     * @readonly
     */
     static LEAD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "lead", false, true, []);

    /**
     * @readonly
     */
     static LEATHER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "leather", false, true, []);

    /**
     * @readonly
     */
     static LEATHER_BOOTS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "leather_boots", false, true, []);

    /**
     * @readonly
     */
     static LEATHER_CHESTPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "leather_chestplate", false, true, []);

    /**
     * @readonly
     */
     static LEATHER_HELMET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "leather_helmet", false, true, []);

    /**
     * @readonly
     */
     static LEATHER_HORSE_ARMOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "leather_horse_armor", false, true, []);

    /**
     * @readonly
     */
     static LEATHER_LEGGINGS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "leather_leggings", false, true, []);

    /**
     * @readonly
     */
     static LEAVES = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "leaves", false, true, []);

    /**
     * @readonly
     */
     static LEAVES2 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "leaves2", false, true, []);

    /**
     * @readonly
     */
     static LECTERN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lectern", "lectern", true, true, ["minecraft:cardinal_direction", "powered_bit"]);

    /**
     * @readonly
     */
     static LEVER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lever", "lever", true, true, ["lever_direction", "open_bit"]);

    /**
     * @readonly
     */
     static LIGHT_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_block", "light_block", true, true, ["block_light_level"]);

    /**
     * @readonly
     */
     static LIGHT_BLUE_CANDLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_blue_candle", "light_blue_candle", true, true, ["candles", "lit"]);

    /**
     * @readonly
     */
     static LIGHT_BLUE_CARPET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_blue_carpet", "light_blue_carpet", true, true, []);

    /**
     * @readonly
     */
     static LIGHT_BLUE_CONCRETE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_blue_concrete", "light_blue_concrete", true, true, []);

    /**
     * @readonly
     */
     static LIGHT_BLUE_CONCRETE_POWDER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_blue_concrete_powder", "light_blue_concrete_powder", true, true, []);

    /**
     * @readonly
     */
     static LIGHT_BLUE_DYE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "light_blue_dye", false, true, []);

    /**
     * @readonly
     */
     static LIGHT_BLUE_GLAZED_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_blue_glazed_terracotta", "light_blue_glazed_terracotta", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static LIGHT_BLUE_SHULKER_BOX = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_blue_shulker_box", "light_blue_shulker_box", true, true, []);

    /**
     * @readonly
     */
     static LIGHT_BLUE_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_blue_stained_glass", "light_blue_stained_glass", true, true, []);

    /**
     * @readonly
     */
     static LIGHT_BLUE_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_blue_stained_glass_pane", "light_blue_stained_glass_pane", true, true, []);

    /**
     * @readonly
     */
     static LIGHT_BLUE_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_blue_terracotta", "light_blue_terracotta", true, true, []);

    /**
     * @readonly
     */
     static LIGHT_BLUE_WOOL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_blue_wool", "light_blue_wool", true, true, []);

    /**
     * @readonly
     */
     static LIGHT_GRAY_CANDLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_gray_candle", "light_gray_candle", true, true, ["candles", "lit"]);

    /**
     * @readonly
     */
     static LIGHT_GRAY_CARPET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_gray_carpet", "light_gray_carpet", true, true, []);

    /**
     * @readonly
     */
     static LIGHT_GRAY_CONCRETE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_gray_concrete", "light_gray_concrete", true, true, []);

    /**
     * @readonly
     */
     static LIGHT_GRAY_CONCRETE_POWDER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_gray_concrete_powder", "light_gray_concrete_powder", true, true, []);

    /**
     * @readonly
     */
     static LIGHT_GRAY_DYE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "light_gray_dye", false, true, []);

    /**
     * @readonly
     */
     static LIGHT_GRAY_SHULKER_BOX = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_gray_shulker_box", "light_gray_shulker_box", true, true, []);

    /**
     * @readonly
     */
     static LIGHT_GRAY_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_gray_stained_glass", "light_gray_stained_glass", true, true, []);

    /**
     * @readonly
     */
     static LIGHT_GRAY_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_gray_stained_glass_pane", "light_gray_stained_glass_pane", true, true, []);

    /**
     * @readonly
     */
     static LIGHT_GRAY_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_gray_terracotta", "light_gray_terracotta", true, true, []);

    /**
     * @readonly
     */
     static LIGHT_GRAY_WOOL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_gray_wool", "light_gray_wool", true, true, []);

    /**
     * @readonly
     */
     static LIGHT_WEIGHTED_PRESSURE_PLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_weighted_pressure_plate", "light_weighted_pressure_plate", true, true, ["redstone_signal"]);

    /**
     * @readonly
     */
     static LIGHTNING_ROD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lightning_rod", "lightning_rod", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static LILAC = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lilac", "lilac", true, true, ["upper_block_bit"]);

    /**
     * @readonly
     */
     static LILY_OF_THE_VALLEY = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lily_of_the_valley", "lily_of_the_valley", true, true, []);

    /**
     * @readonly
     */
     static LIME_CANDLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lime_candle", "lime_candle", true, true, ["candles", "lit"]);

    /**
     * @readonly
     */
     static LIME_CARPET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lime_carpet", "lime_carpet", true, true, []);

    /**
     * @readonly
     */
     static LIME_CONCRETE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lime_concrete", "lime_concrete", true, true, []);

    /**
     * @readonly
     */
     static LIME_CONCRETE_POWDER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lime_concrete_powder", "lime_concrete_powder", true, true, []);

    /**
     * @readonly
     */
     static LIME_DYE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "lime_dye", false, true, []);

    /**
     * @readonly
     */
     static LIME_GLAZED_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lime_glazed_terracotta", "lime_glazed_terracotta", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static LIME_SHULKER_BOX = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lime_shulker_box", "lime_shulker_box", true, true, []);

    /**
     * @readonly
     */
     static LIME_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lime_stained_glass", "lime_stained_glass", true, true, []);

    /**
     * @readonly
     */
     static LIME_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lime_stained_glass_pane", "lime_stained_glass_pane", true, true, []);

    /**
     * @readonly
     */
     static LIME_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lime_terracotta", "lime_terracotta", true, true, []);

    /**
     * @readonly
     */
     static LIME_WOOL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lime_wool", "lime_wool", true, true, []);

    /**
     * @readonly
     */
     static LINGERING_POTION = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "lingering_potion", false, true, []);

    /**
     * @readonly
     */
     static LIT_PUMPKIN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lit_pumpkin", "lit_pumpkin", true, true, ["minecraft:cardinal_direction"]);

    /**
     * @readonly
     */
     static LLAMA_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "llama_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static LODESTONE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lodestone", "lodestone", true, true, []);

    /**
     * @readonly
     */
     static LODESTONE_COMPASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "lodestone_compass", false, true, []);

    /**
     * @readonly
     */
     static LOG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "log", false, true, []);

    /**
     * @readonly
     */
     static LOG2 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "log2", false, true, []);

    /**
     * @readonly
     */
     static LOOM = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "loom", "loom", true, true, ["direction"]);

    /**
     * @readonly
     */
     static MACE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "mace", false, true, []);

    /**
     * @readonly
     */
     static MAGENTA_CANDLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "magenta_candle", "magenta_candle", true, true, ["candles", "lit"]);

    /**
     * @readonly
     */
     static MAGENTA_CARPET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "magenta_carpet", "magenta_carpet", true, true, []);

    /**
     * @readonly
     */
     static MAGENTA_CONCRETE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "magenta_concrete", "magenta_concrete", true, true, []);

    /**
     * @readonly
     */
     static MAGENTA_CONCRETE_POWDER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "magenta_concrete_powder", "magenta_concrete_powder", true, true, []);

    /**
     * @readonly
     */
     static MAGENTA_DYE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "magenta_dye", false, true, []);

    /**
     * @readonly
     */
     static MAGENTA_GLAZED_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "magenta_glazed_terracotta", "magenta_glazed_terracotta", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static MAGENTA_SHULKER_BOX = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "magenta_shulker_box", "magenta_shulker_box", true, true, []);

    /**
     * @readonly
     */
     static MAGENTA_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "magenta_stained_glass", "magenta_stained_glass", true, true, []);

    /**
     * @readonly
     */
     static MAGENTA_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "magenta_stained_glass_pane", "magenta_stained_glass_pane", true, true, []);

    /**
     * @readonly
     */
     static MAGENTA_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "magenta_terracotta", "magenta_terracotta", true, true, []);

    /**
     * @readonly
     */
     static MAGENTA_WOOL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "magenta_wool", "magenta_wool", true, true, []);

    /**
     * @readonly
     */
     static MAGMA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "magma", "magma", true, true, []);

    /**
     * @readonly
     */
     static MAGMA_CREAM = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "magma_cream", false, true, []);

    /**
     * @readonly
     */
     static MAGMA_CUBE_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "magma_cube_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static MANGROVE_BOAT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "mangrove_boat", false, true, []);

    /**
     * @readonly
     */
     static MANGROVE_BUTTON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mangrove_button", "mangrove_button", true, true, ["button_pressed_bit", "facing_direction"]);

    /**
     * @readonly
     */
     static MANGROVE_CHEST_BOAT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "mangrove_chest_boat", false, true, []);

    /**
     * @readonly
     */
     static MANGROVE_DOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mangrove_door", "mangrove_door", true, true, ["direction", "door_hinge_bit", "open_bit", "upper_block_bit"]);

    /**
     * @readonly
     */
     static MANGROVE_FENCE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mangrove_fence", "mangrove_fence", true, true, []);

    /**
     * @readonly
     */
     static MANGROVE_FENCE_GATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mangrove_fence_gate", "mangrove_fence_gate", true, true, ["direction", "in_wall_bit", "open_bit"]);

    /**
     * @readonly
     */
     static MANGROVE_HANGING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mangrove_hanging_sign", "mangrove_hanging_sign", true, true, ["attached_bit", "facing_direction", "ground_sign_direction", "hanging"]);

    /**
     * @readonly
     */
     static MANGROVE_LEAVES = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mangrove_leaves", "mangrove_leaves", true, true, ["persistent_bit", "update_bit"]);

    /**
     * @readonly
     */
     static MANGROVE_LOG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mangrove_log", "mangrove_log", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static MANGROVE_PLANKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mangrove_planks", "mangrove_planks", true, true, []);

    /**
     * @readonly
     */
     static MANGROVE_PRESSURE_PLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mangrove_pressure_plate", "mangrove_pressure_plate", true, true, ["redstone_signal"]);

    /**
     * @readonly
     */
     static MANGROVE_PROPAGULE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mangrove_propagule", "mangrove_propagule", true, true, ["hanging", "propagule_stage"]);

    /**
     * @readonly
     */
     static MANGROVE_ROOTS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mangrove_roots", "mangrove_roots", true, true, []);

    /**
     * @readonly
     */
     static MANGROVE_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "mangrove_sign", false, true, []);

    /**
     * @readonly
     */
     static MANGROVE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mangrove_slab", "mangrove_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static MANGROVE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mangrove_stairs", "mangrove_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static MANGROVE_TRAPDOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mangrove_trapdoor", "mangrove_trapdoor", true, true, ["direction", "open_bit", "upside_down_bit"]);

    /**
     * @readonly
     */
     static MANGROVE_WOOD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mangrove_wood", "mangrove_wood", true, true, ["pillar_axis", "stripped_bit"]);

    /**
     * @readonly
     */
     static MEDIUM_AMETHYST_BUD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "medium_amethyst_bud", "medium_amethyst_bud", true, true, ["minecraft:block_face"]);

    /**
     * @readonly
     */
     static MELON_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "melon_block", "melon_block", true, true, []);

    /**
     * @readonly
     */
     static MELON_SEEDS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "melon_seeds", false, true, []);

    /**
     * @readonly
     */
     static MELON_SLICE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "melon_slice", false, true, []);

    /**
     * @readonly
     */
     static MILK_BUCKET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "milk_bucket", false, true, []);

    /**
     * @readonly
     */
     static MINECART = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "minecart", false, true, []);

    /**
     * @readonly
     */
     static MINER_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "miner_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static MOB_SPAWNER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mob_spawner", "mob_spawner", true, true, []);

    /**
     * @readonly
     */
     static MOJANG_BANNER_PATTERN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "mojang_banner_pattern", false, true, []);

    /**
     * @readonly
     */
     static MONSTER_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "monster_egg", "monster_egg", true, true, ["monster_egg_stone_type"]);

    /**
     * @readonly
     */
     static MOOSHROOM_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "mooshroom_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static MOSS_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "moss_block", "moss_block", true, true, []);

    /**
     * @readonly
     */
     static MOSS_CARPET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "moss_carpet", "moss_carpet", true, true, []);

    /**
     * @readonly
     */
     static MOSSY_COBBLESTONE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mossy_cobblestone", "mossy_cobblestone", true, true, []);

    /**
     * @readonly
     */
     static MOSSY_COBBLESTONE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mossy_cobblestone_stairs", "mossy_cobblestone_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static MOSSY_STONE_BRICK_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mossy_stone_brick_stairs", "mossy_stone_brick_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static MOURNER_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "mourner_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static MUD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mud", "mud", true, true, []);

    /**
     * @readonly
     */
     static MUD_BRICK_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mud_brick_slab", "mud_brick_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static MUD_BRICK_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mud_brick_stairs", "mud_brick_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static MUD_BRICK_WALL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mud_brick_wall", "mud_brick_wall", true, true, ["wall_connection_type_east", "wall_connection_type_north", "wall_connection_type_south", "wall_connection_type_west", "wall_post_bit"]);

    /**
     * @readonly
     */
     static MUD_BRICKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mud_bricks", "mud_bricks", true, true, []);

    /**
     * @readonly
     */
     static MUDDY_MANGROVE_ROOTS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "muddy_mangrove_roots", "muddy_mangrove_roots", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static MULE_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "mule_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static MUSHROOM_STEW = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "mushroom_stew", false, true, []);

    /**
     * @readonly
     */
     static MUSIC_DISC_11 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "music_disc_11", false, true, []);

    /**
     * @readonly
     */
     static MUSIC_DISC_13 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "music_disc_13", false, true, []);

    /**
     * @readonly
     */
     static MUSIC_DISC_5 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "music_disc_5", false, true, []);

    /**
     * @readonly
     */
     static MUSIC_DISC_BLOCKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "music_disc_blocks", false, true, []);

    /**
     * @readonly
     */
     static MUSIC_DISC_CAT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "music_disc_cat", false, true, []);

    /**
     * @readonly
     */
     static MUSIC_DISC_CHIRP = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "music_disc_chirp", false, true, []);

    /**
     * @readonly
     */
     static MUSIC_DISC_CREATOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "music_disc_creator", false, true, []);

    /**
     * @readonly
     */
     static MUSIC_DISC_CREATOR_MUSIC_BOX = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "music_disc_creator_music_box", false, true, []);

    /**
     * @readonly
     */
     static MUSIC_DISC_FAR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "music_disc_far", false, true, []);

    /**
     * @readonly
     */
     static MUSIC_DISC_MALL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "music_disc_mall", false, true, []);

    /**
     * @readonly
     */
     static MUSIC_DISC_MELLOHI = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "music_disc_mellohi", false, true, []);

    /**
     * @readonly
     */
     static MUSIC_DISC_OTHERSIDE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "music_disc_otherside", false, true, []);

    /**
     * @readonly
     */
     static MUSIC_DISC_PIGSTEP = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "music_disc_pigstep", false, true, []);

    /**
     * @readonly
     */
     static MUSIC_DISC_PRECIPICE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "music_disc_precipice", false, true, []);

    /**
     * @readonly
     */
     static MUSIC_DISC_RELIC = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "music_disc_relic", false, true, []);

    /**
     * @readonly
     */
     static MUSIC_DISC_STAL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "music_disc_stal", false, true, []);

    /**
     * @readonly
     */
     static MUSIC_DISC_STRAD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "music_disc_strad", false, true, []);

    /**
     * @readonly
     */
     static MUSIC_DISC_WAIT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "music_disc_wait", false, true, []);

    /**
     * @readonly
     */
     static MUSIC_DISC_WARD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "music_disc_ward", false, true, []);

    /**
     * @readonly
     */
     static MUTTON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "mutton", false, true, []);

    /**
     * @readonly
     */
     static MYCELIUM = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mycelium", "mycelium", true, true, []);

    /**
     * @readonly
     */
     static NAME_TAG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "name_tag", false, true, []);

    /**
     * @readonly
     */
     static NAUTILUS_SHELL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "nautilus_shell", false, true, []);

    /**
     * @readonly
     */
     static NETHER_BRICK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "nether_brick", "nether_brick", true, true, []);

    /**
     * @readonly
     */
     static NETHER_BRICK_FENCE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "nether_brick_fence", "nether_brick_fence", true, true, []);

    /**
     * @readonly
     */
     static NETHER_BRICK_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "nether_brick_slab", "nether_brick_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static NETHER_BRICK_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "nether_brick_stairs", "nether_brick_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static NETHER_GOLD_ORE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "nether_gold_ore", "nether_gold_ore", true, true, []);

    /**
     * @readonly
     */
     static NETHER_SPROUTS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "nether_sprouts", "nether_sprouts", true, true, []);

    /**
     * @readonly
     */
     static NETHER_STAR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "nether_star", false, true, []);

    /**
     * @readonly
     */
     static NETHER_WART = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "nether_wart", "nether_wart", true, true, ["age"]);

    /**
     * @readonly
     */
     static NETHER_WART_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "nether_wart_block", "nether_wart_block", true, true, []);

    /**
     * @readonly
     */
     static NETHERBRICK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "netherbrick", false, true, []);

    /**
     * @readonly
     */
     static NETHERITE_AXE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "netherite_axe", false, true, []);

    /**
     * @readonly
     */
     static NETHERITE_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "netherite_block", "netherite_block", true, true, []);

    /**
     * @readonly
     */
     static NETHERITE_BOOTS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "netherite_boots", false, true, []);

    /**
     * @readonly
     */
     static NETHERITE_CHESTPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "netherite_chestplate", false, true, []);

    /**
     * @readonly
     */
     static NETHERITE_HELMET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "netherite_helmet", false, true, []);

    /**
     * @readonly
     */
     static NETHERITE_HOE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "netherite_hoe", false, true, []);

    /**
     * @readonly
     */
     static NETHERITE_INGOT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "netherite_ingot", false, true, []);

    /**
     * @readonly
     */
     static NETHERITE_LEGGINGS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "netherite_leggings", false, true, []);

    /**
     * @readonly
     */
     static NETHERITE_PICKAXE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "netherite_pickaxe", false, true, []);

    /**
     * @readonly
     */
     static NETHERITE_SCRAP = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "netherite_scrap", false, true, []);

    /**
     * @readonly
     */
     static NETHERITE_SHOVEL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "netherite_shovel", false, true, []);

    /**
     * @readonly
     */
     static NETHERITE_SWORD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "netherite_sword", false, true, []);

    /**
     * @readonly
     */
     static NETHERITE_UPGRADE_SMITHING_TEMPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "netherite_upgrade_smithing_template", false, true, []);

    /**
     * @readonly
     */
     static NETHERRACK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "netherrack", "netherrack", true, true, []);

    /**
     * @readonly
     */
     static NORMAL_STONE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "normal_stone_stairs", "normal_stone_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static NOTEBLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "noteblock", "noteblock", true, true, []);

    /**
     * @readonly
     */
     static OAK_BOAT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "oak_boat", false, true, []);

    /**
     * @readonly
     */
     static OAK_CHEST_BOAT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "oak_chest_boat", false, true, []);

    /**
     * @readonly
     */
     static OAK_FENCE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "oak_fence", "oak_fence", true, true, []);

    /**
     * @readonly
     */
     static OAK_HANGING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "oak_hanging_sign", "oak_hanging_sign", true, true, ["attached_bit", "facing_direction", "ground_sign_direction", "hanging"]);

    /**
     * @readonly
     */
     static OAK_LEAVES = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "oak_leaves", "oak_leaves", true, true, ["persistent_bit", "update_bit"]);

    /**
     * @readonly
     */
     static OAK_LOG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "oak_log", "oak_log", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static OAK_PLANKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "oak_planks", "oak_planks", true, true, []);

    /**
     * @readonly
     */
     static OAK_SAPLING = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "oak_sapling", "oak_sapling", true, true, ["age_bit"]);

    /**
     * @readonly
     */
     static OAK_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "oak_sign", false, true, []);

    /**
     * @readonly
     */
     static OAK_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "oak_slab", "oak_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static OAK_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "oak_stairs", "oak_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static OAK_WOOD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "oak_wood", "oak_wood", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static OBSERVER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "observer", "observer", true, true, ["minecraft:facing_direction", "powered_bit"]);

    /**
     * @readonly
     */
     static OBSIDIAN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "obsidian", "obsidian", true, true, []);

    /**
     * @readonly
     */
     static OCELOT_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "ocelot_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static OCHRE_FROGLIGHT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "ochre_froglight", "ochre_froglight", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static OMINOUS_BOTTLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "ominous_bottle", false, true, []);

    /**
     * @readonly
     */
     static OMINOUS_TRIAL_KEY = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "ominous_trial_key", false, true, []);

    /**
     * @readonly
     */
     static ORANGE_CANDLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "orange_candle", "orange_candle", true, true, ["candles", "lit"]);

    /**
     * @readonly
     */
     static ORANGE_CARPET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "orange_carpet", "orange_carpet", true, true, []);

    /**
     * @readonly
     */
     static ORANGE_CONCRETE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "orange_concrete", "orange_concrete", true, true, []);

    /**
     * @readonly
     */
     static ORANGE_CONCRETE_POWDER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "orange_concrete_powder", "orange_concrete_powder", true, true, []);

    /**
     * @readonly
     */
     static ORANGE_DYE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "orange_dye", false, true, []);

    /**
     * @readonly
     */
     static ORANGE_GLAZED_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "orange_glazed_terracotta", "orange_glazed_terracotta", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static ORANGE_SHULKER_BOX = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "orange_shulker_box", "orange_shulker_box", true, true, []);

    /**
     * @readonly
     */
     static ORANGE_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "orange_stained_glass", "orange_stained_glass", true, true, []);

    /**
     * @readonly
     */
     static ORANGE_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "orange_stained_glass_pane", "orange_stained_glass_pane", true, true, []);

    /**
     * @readonly
     */
     static ORANGE_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "orange_terracotta", "orange_terracotta", true, true, []);

    /**
     * @readonly
     */
     static ORANGE_TULIP = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "orange_tulip", "orange_tulip", true, true, []);

    /**
     * @readonly
     */
     static ORANGE_WOOL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "orange_wool", "orange_wool", true, true, []);

    /**
     * @readonly
     */
     static OXEYE_DAISY = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "oxeye_daisy", "oxeye_daisy", true, true, []);

    /**
     * @readonly
     */
     static OXIDIZED_CHISELED_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "oxidized_chiseled_copper", "oxidized_chiseled_copper", true, true, []);

    /**
     * @readonly
     */
     static OXIDIZED_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "oxidized_copper", "oxidized_copper", true, true, []);

    /**
     * @readonly
     */
     static OXIDIZED_COPPER_BULB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "oxidized_copper_bulb", "oxidized_copper_bulb", true, true, ["lit", "powered_bit"]);

    /**
     * @readonly
     */
     static OXIDIZED_COPPER_DOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "oxidized_copper_door", "oxidized_copper_door", true, true, ["direction", "door_hinge_bit", "open_bit", "upper_block_bit"]);

    /**
     * @readonly
     */
     static OXIDIZED_COPPER_GRATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "oxidized_copper_grate", "oxidized_copper_grate", true, true, []);

    /**
     * @readonly
     */
     static OXIDIZED_COPPER_TRAPDOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "oxidized_copper_trapdoor", "oxidized_copper_trapdoor", true, true, ["direction", "open_bit", "upside_down_bit"]);

    /**
     * @readonly
     */
     static OXIDIZED_CUT_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "oxidized_cut_copper", "oxidized_cut_copper", true, true, []);

    /**
     * @readonly
     */
     static OXIDIZED_CUT_COPPER_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "oxidized_cut_copper_slab", "oxidized_cut_copper_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static OXIDIZED_CUT_COPPER_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "oxidized_cut_copper_stairs", "oxidized_cut_copper_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static PACKED_ICE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "packed_ice", "packed_ice", true, true, []);

    /**
     * @readonly
     */
     static PACKED_MUD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "packed_mud", "packed_mud", true, true, []);

    /**
     * @readonly
     */
     static PAINTING = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "painting", false, true, []);

    /**
     * @readonly
     */
     static PANDA_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "panda_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static PAPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "paper", false, true, []);

    /**
     * @readonly
     */
     static PARROT_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "parrot_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static PEARLESCENT_FROGLIGHT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "pearlescent_froglight", "pearlescent_froglight", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static PEONY = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "peony", "peony", true, true, ["upper_block_bit"]);

    /**
     * @readonly
     */
     static PETRIFIED_OAK_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "petrified_oak_slab", "petrified_oak_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static PHANTOM_MEMBRANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "phantom_membrane", false, true, []);

    /**
     * @readonly
     */
     static PHANTOM_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "phantom_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static PIG_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "pig_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static PIGLIN_BANNER_PATTERN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "piglin_banner_pattern", false, true, []);

    /**
     * @readonly
     */
     static PIGLIN_BRUTE_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "piglin_brute_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static PIGLIN_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "piglin_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static PILLAGER_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "pillager_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static PINK_CANDLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "pink_candle", "pink_candle", true, true, ["candles", "lit"]);

    /**
     * @readonly
     */
     static PINK_CARPET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "pink_carpet", "pink_carpet", true, true, []);

    /**
     * @readonly
     */
     static PINK_CONCRETE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "pink_concrete", "pink_concrete", true, true, []);

    /**
     * @readonly
     */
     static PINK_CONCRETE_POWDER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "pink_concrete_powder", "pink_concrete_powder", true, true, []);

    /**
     * @readonly
     */
     static PINK_DYE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "pink_dye", false, true, []);

    /**
     * @readonly
     */
     static PINK_GLAZED_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "pink_glazed_terracotta", "pink_glazed_terracotta", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static PINK_PETALS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "pink_petals", "pink_petals", true, true, ["growth", "minecraft:cardinal_direction"]);

    /**
     * @readonly
     */
     static PINK_SHULKER_BOX = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "pink_shulker_box", "pink_shulker_box", true, true, []);

    /**
     * @readonly
     */
     static PINK_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "pink_stained_glass", "pink_stained_glass", true, true, []);

    /**
     * @readonly
     */
     static PINK_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "pink_stained_glass_pane", "pink_stained_glass_pane", true, true, []);

    /**
     * @readonly
     */
     static PINK_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "pink_terracotta", "pink_terracotta", true, true, []);

    /**
     * @readonly
     */
     static PINK_TULIP = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "pink_tulip", "pink_tulip", true, true, []);

    /**
     * @readonly
     */
     static PINK_WOOL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "pink_wool", "pink_wool", true, true, []);

    /**
     * @readonly
     */
     static PISTON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "piston", "piston", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static PITCHER_PLANT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "pitcher_plant", "pitcher_plant", true, true, ["upper_block_bit"]);

    /**
     * @readonly
     */
     static PITCHER_POD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "pitcher_pod", false, true, []);

    /**
     * @readonly
     */
     static PLANKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "planks", false, true, []);

    /**
     * @readonly
     */
     static PLENTY_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "plenty_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static PODZOL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "podzol", "podzol", true, true, []);

    /**
     * @readonly
     */
     static POINTED_DRIPSTONE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "pointed_dripstone", "pointed_dripstone", true, true, ["dripstone_thickness", "hanging"]);

    /**
     * @readonly
     */
     static POISONOUS_POTATO = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "poisonous_potato", false, true, []);

    /**
     * @readonly
     */
     static POLAR_BEAR_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "polar_bear_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static POLISHED_ANDESITE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_andesite", "polished_andesite", true, true, []);

    /**
     * @readonly
     */
     static POLISHED_ANDESITE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_andesite_stairs", "polished_andesite_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static POLISHED_BASALT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_basalt", "polished_basalt", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static POLISHED_BLACKSTONE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_blackstone", "polished_blackstone", true, true, []);

    /**
     * @readonly
     */
     static POLISHED_BLACKSTONE_BRICK_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_blackstone_brick_slab", "polished_blackstone_brick_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static POLISHED_BLACKSTONE_BRICK_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_blackstone_brick_stairs", "polished_blackstone_brick_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static POLISHED_BLACKSTONE_BRICK_WALL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_blackstone_brick_wall", "polished_blackstone_brick_wall", true, true, ["wall_connection_type_east", "wall_connection_type_north", "wall_connection_type_south", "wall_connection_type_west", "wall_post_bit"]);

    /**
     * @readonly
     */
     static POLISHED_BLACKSTONE_BRICKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_blackstone_bricks", "polished_blackstone_bricks", true, true, []);

    /**
     * @readonly
     */
     static POLISHED_BLACKSTONE_BUTTON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_blackstone_button", "polished_blackstone_button", true, true, ["button_pressed_bit", "facing_direction"]);

    /**
     * @readonly
     */
     static POLISHED_BLACKSTONE_PRESSURE_PLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_blackstone_pressure_plate", "polished_blackstone_pressure_plate", true, true, ["redstone_signal"]);

    /**
     * @readonly
     */
     static POLISHED_BLACKSTONE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_blackstone_slab", "polished_blackstone_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static POLISHED_BLACKSTONE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_blackstone_stairs", "polished_blackstone_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static POLISHED_BLACKSTONE_WALL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_blackstone_wall", "polished_blackstone_wall", true, true, ["wall_connection_type_east", "wall_connection_type_north", "wall_connection_type_south", "wall_connection_type_west", "wall_post_bit"]);

    /**
     * @readonly
     */
     static POLISHED_DEEPSLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_deepslate", "polished_deepslate", true, true, []);

    /**
     * @readonly
     */
     static POLISHED_DEEPSLATE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_deepslate_slab", "polished_deepslate_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static POLISHED_DEEPSLATE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_deepslate_stairs", "polished_deepslate_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static POLISHED_DEEPSLATE_WALL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_deepslate_wall", "polished_deepslate_wall", true, true, ["wall_connection_type_east", "wall_connection_type_north", "wall_connection_type_south", "wall_connection_type_west", "wall_post_bit"]);

    /**
     * @readonly
     */
     static POLISHED_DIORITE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_diorite", "polished_diorite", true, true, []);

    /**
     * @readonly
     */
     static POLISHED_DIORITE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_diorite_stairs", "polished_diorite_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static POLISHED_GRANITE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_granite", "polished_granite", true, true, []);

    /**
     * @readonly
     */
     static POLISHED_GRANITE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_granite_stairs", "polished_granite_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static POLISHED_TUFF = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_tuff", "polished_tuff", true, true, []);

    /**
     * @readonly
     */
     static POLISHED_TUFF_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_tuff_slab", "polished_tuff_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static POLISHED_TUFF_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_tuff_stairs", "polished_tuff_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static POLISHED_TUFF_WALL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_tuff_wall", "polished_tuff_wall", true, true, ["wall_connection_type_east", "wall_connection_type_north", "wall_connection_type_south", "wall_connection_type_west", "wall_post_bit"]);

    /**
     * @readonly
     */
     static POPPED_CHORUS_FRUIT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "popped_chorus_fruit", false, true, []);

    /**
     * @readonly
     */
     static POPPY = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "poppy", "poppy", true, true, []);

    /**
     * @readonly
     */
     static PORKCHOP = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "porkchop", false, true, []);

    /**
     * @readonly
     */
     static POTATO = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "potatoes", "potato", true, true, ["growth"]);

    /**
     * @readonly
     */
     static POTION = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "potion", false, true, []);

    /**
     * @readonly
     */
     static POWDER_SNOW_BUCKET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "powder_snow", "powder_snow_bucket", true, true, []);

    /**
     * @readonly
     */
     static PRISMARINE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "prismarine", "prismarine", true, true, ["prismarine_block_type"]);

    /**
     * @readonly
     */
     static PRISMARINE_BRICKS_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "prismarine_bricks_stairs", "prismarine_bricks_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static PRISMARINE_CRYSTALS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "prismarine_crystals", false, true, []);

    /**
     * @readonly
     */
     static PRISMARINE_SHARD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "prismarine_shard", false, true, []);

    /**
     * @readonly
     */
     static PRISMARINE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "prismarine_stairs", "prismarine_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static PRIZE_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "prize_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static PUFFERFISH = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "pufferfish", false, true, []);

    /**
     * @readonly
     */
     static PUFFERFISH_BUCKET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "flowing_water", "pufferfish_bucket", true, true, []);

    /**
     * @readonly
     */
     static PUFFERFISH_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "pufferfish_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static PUMPKIN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "pumpkin", "pumpkin", true, true, ["minecraft:cardinal_direction"]);

    /**
     * @readonly
     */
     static PUMPKIN_PIE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "pumpkin_pie", false, true, []);

    /**
     * @readonly
     */
     static PUMPKIN_SEEDS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "pumpkin_seeds", false, true, []);

    /**
     * @readonly
     */
     static PURPLE_CANDLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "purple_candle", "purple_candle", true, true, ["candles", "lit"]);

    /**
     * @readonly
     */
     static PURPLE_CARPET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "purple_carpet", "purple_carpet", true, true, []);

    /**
     * @readonly
     */
     static PURPLE_CONCRETE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "purple_concrete", "purple_concrete", true, true, []);

    /**
     * @readonly
     */
     static PURPLE_CONCRETE_POWDER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "purple_concrete_powder", "purple_concrete_powder", true, true, []);

    /**
     * @readonly
     */
     static PURPLE_DYE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "purple_dye", false, true, []);

    /**
     * @readonly
     */
     static PURPLE_GLAZED_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "purple_glazed_terracotta", "purple_glazed_terracotta", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static PURPLE_SHULKER_BOX = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "purple_shulker_box", "purple_shulker_box", true, true, []);

    /**
     * @readonly
     */
     static PURPLE_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "purple_stained_glass", "purple_stained_glass", true, true, []);

    /**
     * @readonly
     */
     static PURPLE_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "purple_stained_glass_pane", "purple_stained_glass_pane", true, true, []);

    /**
     * @readonly
     */
     static PURPLE_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "purple_terracotta", "purple_terracotta", true, true, []);

    /**
     * @readonly
     */
     static PURPLE_WOOL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "purple_wool", "purple_wool", true, true, []);

    /**
     * @readonly
     */
     static PURPUR_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "purpur_block", "purpur_block", true, true, ["chisel_type", "pillar_axis"]);

    /**
     * @readonly
     */
     static PURPUR_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "purpur_stairs", "purpur_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static QUARTZ = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "quartz", false, true, []);

    /**
     * @readonly
     */
     static QUARTZ_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "quartz_block", "quartz_block", true, true, ["chisel_type", "pillar_axis"]);

    /**
     * @readonly
     */
     static QUARTZ_BRICKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "quartz_bricks", "quartz_bricks", true, true, []);

    /**
     * @readonly
     */
     static QUARTZ_ORE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "quartz_ore", "quartz_ore", true, true, []);

    /**
     * @readonly
     */
     static QUARTZ_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "quartz_slab", "quartz_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static QUARTZ_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "quartz_stairs", "quartz_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static RABBIT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "rabbit", false, true, []);

    /**
     * @readonly
     */
     static RABBIT_FOOT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "rabbit_foot", false, true, []);

    /**
     * @readonly
     */
     static RABBIT_HIDE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "rabbit_hide", false, true, []);

    /**
     * @readonly
     */
     static RABBIT_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "rabbit_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static RABBIT_STEW = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "rabbit_stew", false, true, []);

    /**
     * @readonly
     */
     static RAIL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "rail", "rail", true, true, ["rail_direction"]);

    /**
     * @readonly
     */
     static RAISER_ARMOR_TRIM_SMITHING_TEMPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "raiser_armor_trim_smithing_template", false, true, []);

    /**
     * @readonly
     */
     static RAVAGER_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "ravager_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static RAW_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "raw_copper", false, true, []);

    /**
     * @readonly
     */
     static RAW_COPPER_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "raw_copper_block", "raw_copper_block", true, true, []);

    /**
     * @readonly
     */
     static RAW_GOLD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "raw_gold", false, true, []);

    /**
     * @readonly
     */
     static RAW_GOLD_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "raw_gold_block", "raw_gold_block", true, true, []);

    /**
     * @readonly
     */
     static RAW_IRON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "raw_iron", false, true, []);

    /**
     * @readonly
     */
     static RAW_IRON_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "raw_iron_block", "raw_iron_block", true, true, []);

    /**
     * @readonly
     */
     static RECOVERY_COMPASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "recovery_compass", false, true, []);

    /**
     * @readonly
     */
     static RED_CANDLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "red_candle", "red_candle", true, true, ["candles", "lit"]);

    /**
     * @readonly
     */
     static RED_CARPET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "red_carpet", "red_carpet", true, true, []);

    /**
     * @readonly
     */
     static RED_CONCRETE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "red_concrete", "red_concrete", true, true, []);

    /**
     * @readonly
     */
     static RED_CONCRETE_POWDER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "red_concrete_powder", "red_concrete_powder", true, true, []);

    /**
     * @readonly
     */
     static RED_DYE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "red_dye", false, true, []);

    /**
     * @readonly
     */
     static RED_FLOWER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "red_flower", false, true, []);

    /**
     * @readonly
     */
     static RED_GLAZED_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "red_glazed_terracotta", "red_glazed_terracotta", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static RED_MUSHROOM = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "red_mushroom", "red_mushroom", true, true, []);

    /**
     * @readonly
     */
     static RED_MUSHROOM_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "red_mushroom_block", "red_mushroom_block", true, true, ["huge_mushroom_bits"]);

    /**
     * @readonly
     */
     static RED_NETHER_BRICK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "red_nether_brick", "red_nether_brick", true, true, []);

    /**
     * @readonly
     */
     static RED_NETHER_BRICK_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "red_nether_brick_stairs", "red_nether_brick_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static RED_SANDSTONE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "red_sandstone", "red_sandstone", true, true, ["sand_stone_type"]);

    /**
     * @readonly
     */
     static RED_SANDSTONE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "red_sandstone_stairs", "red_sandstone_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static RED_SHULKER_BOX = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "red_shulker_box", "red_shulker_box", true, true, []);

    /**
     * @readonly
     */
     static RED_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "red_stained_glass", "red_stained_glass", true, true, []);

    /**
     * @readonly
     */
     static RED_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "red_stained_glass_pane", "red_stained_glass_pane", true, true, []);

    /**
     * @readonly
     */
     static RED_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "red_terracotta", "red_terracotta", true, true, []);

    /**
     * @readonly
     */
     static RED_TULIP = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "red_tulip", "red_tulip", true, true, []);

    /**
     * @readonly
     */
     static RED_WOOL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "red_wool", "red_wool", true, true, []);

    /**
     * @readonly
     */
     static REDSTONE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "redstone", false, true, []);

    /**
     * @readonly
     */
     static REDSTONE_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "redstone_block", "redstone_block", true, true, []);

    /**
     * @readonly
     */
     static REDSTONE_LAMP = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "redstone_lamp", "redstone_lamp", true, true, []);

    /**
     * @readonly
     */
     static REDSTONE_ORE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "redstone_ore", "redstone_ore", true, true, []);

    /**
     * @readonly
     */
     static REDSTONE_TORCH = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "redstone_torch", "redstone_torch", true, true, ["torch_facing_direction"]);

    /**
     * @readonly
     */
     static REINFORCED_DEEPSLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "reinforced_deepslate", "reinforced_deepslate", true, true, []);

    /**
     * @readonly
     */
     static REPEATER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "repeater", false, true, []);

    /**
     * @readonly
     */
     static REPEATING_COMMAND_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "repeating_command_block", "repeating_command_block", true, true, ["conditional_bit", "facing_direction"]);

    /**
     * @readonly
     */
     static RESPAWN_ANCHOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "respawn_anchor", "respawn_anchor", true, true, ["respawn_anchor_charge"]);

    /**
     * @readonly
     */
     static RIB_ARMOR_TRIM_SMITHING_TEMPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "rib_armor_trim_smithing_template", false, true, []);

    /**
     * @readonly
     */
     static ROSE_BUSH = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "rose_bush", "rose_bush", true, true, ["upper_block_bit"]);

    /**
     * @readonly
     */
     static ROTTEN_FLESH = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "rotten_flesh", false, true, []);

    /**
     * @readonly
     */
     static SADDLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "saddle", false, true, []);

    /**
     * @readonly
     */
     static SALMON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "salmon", false, true, []);

    /**
     * @readonly
     */
     static SALMON_BUCKET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "flowing_water", "salmon_bucket", true, true, []);

    /**
     * @readonly
     */
     static SALMON_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "salmon_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static SAND = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "sand", "sand", true, true, ["sand_type"]);

    /**
     * @readonly
     */
     static SANDSTONE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "sandstone", "sandstone", true, true, ["sand_stone_type"]);

    /**
     * @readonly
     */
     static SANDSTONE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "sandstone_slab", "sandstone_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static SANDSTONE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "sandstone_stairs", "sandstone_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static SAPLING = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "sapling", false, true, []);

    /**
     * @readonly
     */
     static SCAFFOLDING = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "scaffolding", "scaffolding", true, true, ["stability", "stability_check"]);

    /**
     * @readonly
     */
     static SCRAPE_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "scrape_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static SCULK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "sculk", "sculk", true, true, []);

    /**
     * @readonly
     */
     static SCULK_CATALYST = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "sculk_catalyst", "sculk_catalyst", true, true, ["bloom"]);

    /**
     * @readonly
     */
     static SCULK_SENSOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "sculk_sensor", "sculk_sensor", true, true, ["sculk_sensor_phase"]);

    /**
     * @readonly
     */
     static SCULK_SHRIEKER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "sculk_shrieker", "sculk_shrieker", true, true, ["active", "can_summon"]);

    /**
     * @readonly
     */
     static SCULK_VEIN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "sculk_vein", "sculk_vein", true, true, ["multi_face_direction_bits"]);

    /**
     * @readonly
     */
     static SEA_LANTERN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "sea_lantern", "sea_lantern", true, true, []);

    /**
     * @readonly
     */
     static SEA_PICKLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "sea_pickle", "sea_pickle", true, true, ["cluster_count", "dead_bit"]);

    /**
     * @readonly
     */
     static SEAGRASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "seagrass", "seagrass", true, true, ["sea_grass_type"]);

    /**
     * @readonly
     */
     static SENTRY_ARMOR_TRIM_SMITHING_TEMPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "sentry_armor_trim_smithing_template", false, true, []);

    /**
     * @readonly
     */
     static SHAPER_ARMOR_TRIM_SMITHING_TEMPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "shaper_armor_trim_smithing_template", false, true, []);

    /**
     * @readonly
     */
     static SHEAF_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "sheaf_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static SHEARS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "shears", false, true, []);

    /**
     * @readonly
     */
     static SHEEP_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "sheep_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static SHELTER_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "shelter_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static SHIELD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "shield", false, true, []);

    /**
     * @readonly
     */
     static SHORT_GRASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "short_grass", "short_grass", true, true, []);

    /**
     * @readonly
     */
     static SHROOMLIGHT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "shroomlight", "shroomlight", true, true, []);

    /**
     * @readonly
     */
     static SHULKER_BOX = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "shulker_box", false, true, []);

    /**
     * @readonly
     */
     static SHULKER_SHELL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "shulker_shell", false, true, []);

    /**
     * @readonly
     */
     static SHULKER_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "shulker_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static SILENCE_ARMOR_TRIM_SMITHING_TEMPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "silence_armor_trim_smithing_template", false, true, []);

    /**
     * @readonly
     */
     static SILVER_GLAZED_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "silver_glazed_terracotta", "silver_glazed_terracotta", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static SILVERFISH_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "silverfish_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static SKELETON_HORSE_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "skeleton_horse_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static SKELETON_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "skeleton_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static SKULL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "skull", "skull", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static SKULL_BANNER_PATTERN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "skull_banner_pattern", false, true, []);

    /**
     * @readonly
     */
     static SKULL_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "skull_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static SLIME = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "slime", "slime", true, true, []);

    /**
     * @readonly
     */
     static SLIME_BALL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "slime_ball", false, true, []);

    /**
     * @readonly
     */
     static SLIME_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "slime_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static SMALL_AMETHYST_BUD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "small_amethyst_bud", "small_amethyst_bud", true, true, ["minecraft:block_face"]);

    /**
     * @readonly
     */
     static SMALL_DRIPLEAF_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "small_dripleaf_block", "small_dripleaf_block", true, true, ["minecraft:cardinal_direction", "upper_block_bit"]);

    /**
     * @readonly
     */
     static SMITHING_TABLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "smithing_table", "smithing_table", true, true, []);

    /**
     * @readonly
     */
     static SMOKER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "smoker", "smoker", true, true, ["minecraft:cardinal_direction"]);

    /**
     * @readonly
     */
     static SMOOTH_BASALT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "smooth_basalt", "smooth_basalt", true, true, []);

    /**
     * @readonly
     */
     static SMOOTH_QUARTZ_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "smooth_quartz_stairs", "smooth_quartz_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static SMOOTH_RED_SANDSTONE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "smooth_red_sandstone_stairs", "smooth_red_sandstone_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static SMOOTH_SANDSTONE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "smooth_sandstone_stairs", "smooth_sandstone_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static SMOOTH_STONE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "smooth_stone", "smooth_stone", true, true, []);

    /**
     * @readonly
     */
     static SMOOTH_STONE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "smooth_stone_slab", "smooth_stone_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static SNIFFER_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "sniffer_egg", "sniffer_egg", true, true, ["cracked_state"]);

    /**
     * @readonly
     */
     static SNIFFER_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "sniffer_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static SNORT_POTTERY_SHERD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "snort_pottery_sherd", false, true, []);

    /**
     * @readonly
     */
     static SNOUT_ARMOR_TRIM_SMITHING_TEMPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "snout_armor_trim_smithing_template", false, true, []);

    /**
     * @readonly
     */
     static SNOW = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "snow", "snow", true, true, []);

    /**
     * @readonly
     */
     static SNOW_GOLEM_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "snow_golem_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static SNOW_LAYER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "snow_layer", "snow_layer", true, true, ["covered_bit", "height"]);

    /**
     * @readonly
     */
     static SNOWBALL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "snowball", false, true, []);

    /**
     * @readonly
     */
     static SOUL_CAMPFIRE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "soul_campfire", "soul_campfire", true, true, ["extinguished", "minecraft:cardinal_direction"]);

    /**
     * @readonly
     */
     static SOUL_LANTERN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "soul_lantern", "soul_lantern", true, true, ["hanging"]);

    /**
     * @readonly
     */
     static SOUL_SAND = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "soul_sand", "soul_sand", true, true, []);

    /**
     * @readonly
     */
     static SOUL_SOIL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "soul_soil", "soul_soil", true, true, []);

    /**
     * @readonly
     */
     static SOUL_TORCH = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "soul_torch", "soul_torch", true, true, ["torch_facing_direction"]);

    /**
     * @readonly
     */
     static SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static SPIDER_EYE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "spider_eye", false, true, []);

    /**
     * @readonly
     */
     static SPIDER_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "spider_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static SPIRE_ARMOR_TRIM_SMITHING_TEMPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "spire_armor_trim_smithing_template", false, true, []);

    /**
     * @readonly
     */
     static SPLASH_POTION = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "splash_potion", false, true, []);

    /**
     * @readonly
     */
     static SPONGE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "sponge", "sponge", true, true, ["sponge_type"]);

    /**
     * @readonly
     */
     static SPORE_BLOSSOM = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "spore_blossom", "spore_blossom", true, true, []);

    /**
     * @readonly
     */
     static SPRUCE_BOAT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "spruce_boat", false, true, []);

    /**
     * @readonly
     */
     static SPRUCE_BUTTON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "spruce_button", "spruce_button", true, true, ["button_pressed_bit", "facing_direction"]);

    /**
     * @readonly
     */
     static SPRUCE_CHEST_BOAT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "spruce_chest_boat", false, true, []);

    /**
     * @readonly
     */
     static SPRUCE_DOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "spruce_door", "spruce_door", true, true, ["direction", "door_hinge_bit", "open_bit", "upper_block_bit"]);

    /**
     * @readonly
     */
     static SPRUCE_FENCE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "spruce_fence", "spruce_fence", true, true, []);

    /**
     * @readonly
     */
     static SPRUCE_FENCE_GATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "spruce_fence_gate", "spruce_fence_gate", true, true, ["direction", "in_wall_bit", "open_bit"]);

    /**
     * @readonly
     */
     static SPRUCE_HANGING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "spruce_hanging_sign", "spruce_hanging_sign", true, true, ["attached_bit", "facing_direction", "ground_sign_direction", "hanging"]);

    /**
     * @readonly
     */
     static SPRUCE_LEAVES = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "spruce_leaves", "spruce_leaves", true, true, ["persistent_bit", "update_bit"]);

    /**
     * @readonly
     */
     static SPRUCE_LOG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "spruce_log", "spruce_log", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static SPRUCE_PLANKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "spruce_planks", "spruce_planks", true, true, []);

    /**
     * @readonly
     */
     static SPRUCE_PRESSURE_PLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "spruce_pressure_plate", "spruce_pressure_plate", true, true, ["redstone_signal"]);

    /**
     * @readonly
     */
     static SPRUCE_SAPLING = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "spruce_sapling", "spruce_sapling", true, true, ["age_bit"]);

    /**
     * @readonly
     */
     static SPRUCE_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "spruce_sign", false, true, []);

    /**
     * @readonly
     */
     static SPRUCE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "spruce_slab", "spruce_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static SPRUCE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "spruce_stairs", "spruce_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static SPRUCE_TRAPDOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "spruce_trapdoor", "spruce_trapdoor", true, true, ["direction", "open_bit", "upside_down_bit"]);

    /**
     * @readonly
     */
     static SPRUCE_WOOD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "spruce_wood", "spruce_wood", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static SPYGLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "spyglass", false, true, []);

    /**
     * @readonly
     */
     static SQUID_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "squid_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "stained_glass", false, true, []);

    /**
     * @readonly
     */
     static STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "stained_glass_pane", false, true, []);

    /**
     * @readonly
     */
     static STAINED_HARDENED_CLAY = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "stained_hardened_clay", false, true, []);

    /**
     * @readonly
     */
     static STICK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "stick", false, true, []);

    /**
     * @readonly
     */
     static STICKY_PISTON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "sticky_piston", "sticky_piston", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static STONE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stone", "stone", true, true, []);

    /**
     * @readonly
     */
     static STONE_AXE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "stone_axe", false, true, []);

    /**
     * @readonly
     */
     static STONE_BLOCK_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "stone_block_slab", false, true, []);

    /**
     * @readonly
     */
     static STONE_BLOCK_SLAB2 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stone_block_slab2", "stone_block_slab2", true, true, ["minecraft:vertical_half", "stone_slab_type_2"]);

    /**
     * @readonly
     */
     static STONE_BLOCK_SLAB3 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stone_block_slab3", "stone_block_slab3", true, true, ["minecraft:vertical_half", "stone_slab_type_3"]);

    /**
     * @readonly
     */
     static STONE_BLOCK_SLAB4 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stone_block_slab4", "stone_block_slab4", true, true, ["minecraft:vertical_half", "stone_slab_type_4"]);

    /**
     * @readonly
     */
     static STONE_BRICK_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stone_brick_slab", "stone_brick_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static STONE_BRICK_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stone_brick_stairs", "stone_brick_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static STONE_BUTTON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stone_button", "stone_button", true, true, ["button_pressed_bit", "facing_direction"]);

    /**
     * @readonly
     */
     static STONE_HOE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "stone_hoe", false, true, []);

    /**
     * @readonly
     */
     static STONE_PICKAXE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "stone_pickaxe", false, true, []);

    /**
     * @readonly
     */
     static STONE_PRESSURE_PLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stone_pressure_plate", "stone_pressure_plate", true, true, ["redstone_signal"]);

    /**
     * @readonly
     */
     static STONE_SHOVEL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "stone_shovel", false, true, []);

    /**
     * @readonly
     */
     static STONE_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stone_stairs", "stone_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static STONE_SWORD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "stone_sword", false, true, []);

    /**
     * @readonly
     */
     static STONEBRICK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stonebrick", "stonebrick", true, true, ["stone_brick_type"]);

    /**
     * @readonly
     */
     static STONECUTTER_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stonecutter_block", "stonecutter_block", true, true, ["minecraft:cardinal_direction"]);

    /**
     * @readonly
     */
     static STRAY_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "stray_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static STRIDER_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "strider_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static STRING = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "string", false, true, []);

    /**
     * @readonly
     */
     static STRIPPED_ACACIA_LOG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stripped_acacia_log", "stripped_acacia_log", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static STRIPPED_ACACIA_WOOD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stripped_acacia_wood", "stripped_acacia_wood", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static STRIPPED_BAMBOO_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stripped_bamboo_block", "stripped_bamboo_block", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static STRIPPED_BIRCH_LOG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stripped_birch_log", "stripped_birch_log", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static STRIPPED_BIRCH_WOOD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stripped_birch_wood", "stripped_birch_wood", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static STRIPPED_CHERRY_LOG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stripped_cherry_log", "stripped_cherry_log", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static STRIPPED_CHERRY_WOOD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stripped_cherry_wood", "stripped_cherry_wood", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static STRIPPED_CRIMSON_HYPHAE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stripped_crimson_hyphae", "stripped_crimson_hyphae", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static STRIPPED_CRIMSON_STEM = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stripped_crimson_stem", "stripped_crimson_stem", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static STRIPPED_DARK_OAK_LOG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stripped_dark_oak_log", "stripped_dark_oak_log", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static STRIPPED_DARK_OAK_WOOD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stripped_dark_oak_wood", "stripped_dark_oak_wood", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static STRIPPED_JUNGLE_LOG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stripped_jungle_log", "stripped_jungle_log", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static STRIPPED_JUNGLE_WOOD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stripped_jungle_wood", "stripped_jungle_wood", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static STRIPPED_MANGROVE_LOG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stripped_mangrove_log", "stripped_mangrove_log", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static STRIPPED_MANGROVE_WOOD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stripped_mangrove_wood", "stripped_mangrove_wood", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static STRIPPED_OAK_LOG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stripped_oak_log", "stripped_oak_log", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static STRIPPED_OAK_WOOD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stripped_oak_wood", "stripped_oak_wood", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static STRIPPED_SPRUCE_LOG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stripped_spruce_log", "stripped_spruce_log", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static STRIPPED_SPRUCE_WOOD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stripped_spruce_wood", "stripped_spruce_wood", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static STRIPPED_WARPED_HYPHAE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stripped_warped_hyphae", "stripped_warped_hyphae", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static STRIPPED_WARPED_STEM = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stripped_warped_stem", "stripped_warped_stem", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static STRUCTURE_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "structure_block", "structure_block", true, true, ["structure_block_type"]);

    /**
     * @readonly
     */
     static STRUCTURE_VOID = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "structure_void", "structure_void", true, true, ["structure_void_type"]);

    /**
     * @readonly
     */
     static SUGAR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "sugar", false, true, []);

    /**
     * @readonly
     */
     static SUGAR_CANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "sugar_cane", false, true, []);

    /**
     * @readonly
     */
     static SUNFLOWER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "sunflower", "sunflower", true, true, ["upper_block_bit"]);

    /**
     * @readonly
     */
     static SUSPICIOUS_GRAVEL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "suspicious_gravel", "suspicious_gravel", true, true, ["brushed_progress", "hanging"]);

    /**
     * @readonly
     */
     static SUSPICIOUS_SAND = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "suspicious_sand", "suspicious_sand", true, true, ["brushed_progress", "hanging"]);

    /**
     * @readonly
     */
     static SUSPICIOUS_STEW = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "suspicious_stew", false, true, []);

    /**
     * @readonly
     */
     static SWEET_BERRY = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "sweet_berry_bush", "sweet_berries", true, true, ["growth"]);

    /**
     * @readonly
     */
     static TADPOLE_BUCKET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "flowing_water", "tadpole_bucket", true, true, []);

    /**
     * @readonly
     */
     static TADPOLE_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "tadpole_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static TALL_GRASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "tall_grass", "tall_grass", true, true, ["upper_block_bit"]);

    /**
     * @readonly
     */
     static TALLGRASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "tallgrass", false, true, []);

    /**
     * @readonly
     */
     static TARGET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "target", "target", true, true, []);

    /**
     * @readonly
     */
     static TIDE_ARMOR_TRIM_SMITHING_TEMPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "tide_armor_trim_smithing_template", false, true, []);

    /**
     * @readonly
     */
     static TINTED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "tinted_glass", "tinted_glass", true, true, []);

    /**
     * @readonly
     */
     static TNT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "tnt", "tnt", true, true, ["allow_underwater_bit", "explode_bit"]);

    /**
     * @readonly
     */
     static TNT_MINECART = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "tnt_minecart", false, true, []);

    /**
     * @readonly
     */
     static TORCH = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "torch", "torch", true, true, ["torch_facing_direction"]);

    /**
     * @readonly
     */
     static TORCHFLOWER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "torchflower", "torchflower", true, true, []);

    /**
     * @readonly
     */
     static TORCHFLOWER_SEEDS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "torchflower_seeds", false, true, []);

    /**
     * @readonly
     */
     static TOTEM_OF_UNDYING = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "totem_of_undying", false, true, []);

    /**
     * @readonly
     */
     static TRADER_LLAMA_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "trader_llama_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static TRAPDOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "trapdoor", "trapdoor", true, true, ["direction", "open_bit", "upside_down_bit"]);

    /**
     * @readonly
     */
     static TRAPPED_CHEST = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "trapped_chest", "trapped_chest", true, true, ["minecraft:cardinal_direction"]);

    /**
     * @readonly
     */
     static TRIAL_KEY = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "trial_key", false, true, []);

    /**
     * @readonly
     */
     static TRIAL_SPAWNER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "trial_spawner", "trial_spawner", true, true, ["ominous", "trial_spawner_state"]);

    /**
     * @readonly
     */
     static TRIDENT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "trident", false, true, []);

    /**
     * @readonly
     */
     static TRIPWIRE_HOOK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "tripwire_hook", "tripwire_hook", true, true, ["attached_bit", "direction", "powered_bit"]);

    /**
     * @readonly
     */
     static TROPICAL_FISH = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "tropical_fish", false, true, []);

    /**
     * @readonly
     */
     static TROPICAL_FISH_BUCKET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "flowing_water", "tropical_fish_bucket", true, true, []);

    /**
     * @readonly
     */
     static TROPICAL_FISH_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "tropical_fish_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static TUBE_CORAL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "tube_coral", "tube_coral", true, true, []);

    /**
     * @readonly
     */
     static TUBE_CORAL_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "tube_coral_block", "tube_coral_block", true, true, []);

    /**
     * @readonly
     */
     static TUBE_CORAL_FAN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "tube_coral_fan", "tube_coral_fan", true, true, ["coral_fan_direction"]);

    /**
     * @readonly
     */
     static TUFF = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "tuff", "tuff", true, true, []);

    /**
     * @readonly
     */
     static TUFF_BRICK_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "tuff_brick_slab", "tuff_brick_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static TUFF_BRICK_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "tuff_brick_stairs", "tuff_brick_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static TUFF_BRICK_WALL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "tuff_brick_wall", "tuff_brick_wall", true, true, ["wall_connection_type_east", "wall_connection_type_north", "wall_connection_type_south", "wall_connection_type_west", "wall_post_bit"]);

    /**
     * @readonly
     */
     static TUFF_BRICKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "tuff_bricks", "tuff_bricks", true, true, []);

    /**
     * @readonly
     */
     static TUFF_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "tuff_slab", "tuff_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static TUFF_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "tuff_stairs", "tuff_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static TUFF_WALL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "tuff_wall", "tuff_wall", true, true, ["wall_connection_type_east", "wall_connection_type_north", "wall_connection_type_south", "wall_connection_type_west", "wall_post_bit"]);

    /**
     * @readonly
     */
     static TURTLE_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "turtle_egg", "turtle_egg", true, true, ["cracked_state", "turtle_egg_count"]);

    /**
     * @readonly
     */
     static TURTLE_HELMET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "turtle_helmet", false, true, []);

    /**
     * @readonly
     */
     static TURTLE_SCUTE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "turtle_scute", false, true, []);

    /**
     * @readonly
     */
     static TURTLE_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "turtle_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static TWISTING_VINES = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "twisting_vines", "twisting_vines", true, true, ["twisting_vines_age"]);

    /**
     * @readonly
     */
     static UNDYED_SHULKER_BOX = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "undyed_shulker_box", "undyed_shulker_box", true, true, []);

    /**
     * @readonly
     */
     static VAULT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "vault", "vault", true, true, ["minecraft:cardinal_direction", "ominous", "vault_state"]);

    /**
     * @readonly
     */
     static VERDANT_FROGLIGHT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "verdant_froglight", "verdant_froglight", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static VEX_ARMOR_TRIM_SMITHING_TEMPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "vex_armor_trim_smithing_template", false, true, []);

    /**
     * @readonly
     */
     static VEX_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "vex_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static VILLAGER_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "villager_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static VINDICATOR_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "vindicator_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static VINE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "vine", "vine", true, true, ["vine_direction_bits"]);

    /**
     * @readonly
     */
     static WANDERING_TRADER_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "wandering_trader_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static WARD_ARMOR_TRIM_SMITHING_TEMPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "ward_armor_trim_smithing_template", false, true, []);

    /**
     * @readonly
     */
     static WARDEN_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "warden_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static WARPED_BUTTON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "warped_button", "warped_button", true, true, ["button_pressed_bit", "facing_direction"]);

    /**
     * @readonly
     */
     static WARPED_DOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "warped_door", "warped_door", true, true, ["direction", "door_hinge_bit", "open_bit", "upper_block_bit"]);

    /**
     * @readonly
     */
     static WARPED_FENCE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "warped_fence", "warped_fence", true, true, []);

    /**
     * @readonly
     */
     static WARPED_FENCE_GATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "warped_fence_gate", "warped_fence_gate", true, true, ["direction", "in_wall_bit", "open_bit"]);

    /**
     * @readonly
     */
     static WARPED_FUNGUS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "warped_fungus", "warped_fungus", true, true, []);

    /**
     * @readonly
     */
     static WARPED_FUNGUS_ON_A_STICK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "warped_fungus_on_a_stick", false, true, []);

    /**
     * @readonly
     */
     static WARPED_HANGING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "warped_hanging_sign", "warped_hanging_sign", true, true, ["attached_bit", "facing_direction", "ground_sign_direction", "hanging"]);

    /**
     * @readonly
     */
     static WARPED_HYPHAE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "warped_hyphae", "warped_hyphae", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static WARPED_NYLIUM = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "warped_nylium", "warped_nylium", true, true, []);

    /**
     * @readonly
     */
     static WARPED_PLANKS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "warped_planks", "warped_planks", true, true, []);

    /**
     * @readonly
     */
     static WARPED_PRESSURE_PLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "warped_pressure_plate", "warped_pressure_plate", true, true, ["redstone_signal"]);

    /**
     * @readonly
     */
     static WARPED_ROOTS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "warped_roots", "warped_roots", true, true, []);

    /**
     * @readonly
     */
     static WARPED_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "warped_sign", false, true, []);

    /**
     * @readonly
     */
     static WARPED_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "warped_slab", "warped_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static WARPED_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "warped_stairs", "warped_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static WARPED_STEM = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "warped_stem", "warped_stem", true, true, ["pillar_axis"]);

    /**
     * @readonly
     */
     static WARPED_TRAPDOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "warped_trapdoor", "warped_trapdoor", true, true, ["direction", "open_bit", "upside_down_bit"]);

    /**
     * @readonly
     */
     static WARPED_WART_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "warped_wart_block", "warped_wart_block", true, true, []);

    /**
     * @readonly
     */
     static WATER_BUCKET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "flowing_water", "water_bucket", true, true, []);

    /**
     * @readonly
     */
     static WATERLILY = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waterlily", "waterlily", true, true, []);

    /**
     * @readonly
     */
     static WAXED_CHISELED_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_chiseled_copper", "waxed_chiseled_copper", true, true, []);

    /**
     * @readonly
     */
     static WAXED_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_copper", "waxed_copper", true, true, []);

    /**
     * @readonly
     */
     static WAXED_COPPER_BULB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_copper_bulb", "waxed_copper_bulb", true, true, ["lit", "powered_bit"]);

    /**
     * @readonly
     */
     static WAXED_COPPER_DOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_copper_door", "waxed_copper_door", true, true, ["direction", "door_hinge_bit", "open_bit", "upper_block_bit"]);

    /**
     * @readonly
     */
     static WAXED_COPPER_GRATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_copper_grate", "waxed_copper_grate", true, true, []);

    /**
     * @readonly
     */
     static WAXED_COPPER_TRAPDOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_copper_trapdoor", "waxed_copper_trapdoor", true, true, ["direction", "open_bit", "upside_down_bit"]);

    /**
     * @readonly
     */
     static WAXED_CUT_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_cut_copper", "waxed_cut_copper", true, true, []);

    /**
     * @readonly
     */
     static WAXED_CUT_COPPER_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_cut_copper_slab", "waxed_cut_copper_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static WAXED_CUT_COPPER_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_cut_copper_stairs", "waxed_cut_copper_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static WAXED_EXPOSED_CHISELED_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_exposed_chiseled_copper", "waxed_exposed_chiseled_copper", true, true, []);

    /**
     * @readonly
     */
     static WAXED_EXPOSED_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_exposed_copper", "waxed_exposed_copper", true, true, []);

    /**
     * @readonly
     */
     static WAXED_EXPOSED_COPPER_BULB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_exposed_copper_bulb", "waxed_exposed_copper_bulb", true, true, ["lit", "powered_bit"]);

    /**
     * @readonly
     */
     static WAXED_EXPOSED_COPPER_DOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_exposed_copper_door", "waxed_exposed_copper_door", true, true, ["direction", "door_hinge_bit", "open_bit", "upper_block_bit"]);

    /**
     * @readonly
     */
     static WAXED_EXPOSED_COPPER_GRATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_exposed_copper_grate", "waxed_exposed_copper_grate", true, true, []);

    /**
     * @readonly
     */
     static WAXED_EXPOSED_COPPER_TRAPDOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_exposed_copper_trapdoor", "waxed_exposed_copper_trapdoor", true, true, ["direction", "open_bit", "upside_down_bit"]);

    /**
     * @readonly
     */
     static WAXED_EXPOSED_CUT_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_exposed_cut_copper", "waxed_exposed_cut_copper", true, true, []);

    /**
     * @readonly
     */
     static WAXED_EXPOSED_CUT_COPPER_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_exposed_cut_copper_slab", "waxed_exposed_cut_copper_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static WAXED_EXPOSED_CUT_COPPER_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_exposed_cut_copper_stairs", "waxed_exposed_cut_copper_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static WAXED_OXIDIZED_CHISELED_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_oxidized_chiseled_copper", "waxed_oxidized_chiseled_copper", true, true, []);

    /**
     * @readonly
     */
     static WAXED_OXIDIZED_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_oxidized_copper", "waxed_oxidized_copper", true, true, []);

    /**
     * @readonly
     */
     static WAXED_OXIDIZED_COPPER_BULB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_oxidized_copper_bulb", "waxed_oxidized_copper_bulb", true, true, ["lit", "powered_bit"]);

    /**
     * @readonly
     */
     static WAXED_OXIDIZED_COPPER_DOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_oxidized_copper_door", "waxed_oxidized_copper_door", true, true, ["direction", "door_hinge_bit", "open_bit", "upper_block_bit"]);

    /**
     * @readonly
     */
     static WAXED_OXIDIZED_COPPER_GRATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_oxidized_copper_grate", "waxed_oxidized_copper_grate", true, true, []);

    /**
     * @readonly
     */
     static WAXED_OXIDIZED_COPPER_TRAPDOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_oxidized_copper_trapdoor", "waxed_oxidized_copper_trapdoor", true, true, ["direction", "open_bit", "upside_down_bit"]);

    /**
     * @readonly
     */
     static WAXED_OXIDIZED_CUT_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_oxidized_cut_copper", "waxed_oxidized_cut_copper", true, true, []);

    /**
     * @readonly
     */
     static WAXED_OXIDIZED_CUT_COPPER_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_oxidized_cut_copper_slab", "waxed_oxidized_cut_copper_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static WAXED_OXIDIZED_CUT_COPPER_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_oxidized_cut_copper_stairs", "waxed_oxidized_cut_copper_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static WAXED_WEATHERED_CHISELED_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_weathered_chiseled_copper", "waxed_weathered_chiseled_copper", true, true, []);

    /**
     * @readonly
     */
     static WAXED_WEATHERED_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_weathered_copper", "waxed_weathered_copper", true, true, []);

    /**
     * @readonly
     */
     static WAXED_WEATHERED_COPPER_BULB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_weathered_copper_bulb", "waxed_weathered_copper_bulb", true, true, ["lit", "powered_bit"]);

    /**
     * @readonly
     */
     static WAXED_WEATHERED_COPPER_DOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_weathered_copper_door", "waxed_weathered_copper_door", true, true, ["direction", "door_hinge_bit", "open_bit", "upper_block_bit"]);

    /**
     * @readonly
     */
     static WAXED_WEATHERED_COPPER_GRATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_weathered_copper_grate", "waxed_weathered_copper_grate", true, true, []);

    /**
     * @readonly
     */
     static WAXED_WEATHERED_COPPER_TRAPDOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_weathered_copper_trapdoor", "waxed_weathered_copper_trapdoor", true, true, ["direction", "open_bit", "upside_down_bit"]);

    /**
     * @readonly
     */
     static WAXED_WEATHERED_CUT_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_weathered_cut_copper", "waxed_weathered_cut_copper", true, true, []);

    /**
     * @readonly
     */
     static WAXED_WEATHERED_CUT_COPPER_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_weathered_cut_copper_slab", "waxed_weathered_cut_copper_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static WAXED_WEATHERED_CUT_COPPER_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_weathered_cut_copper_stairs", "waxed_weathered_cut_copper_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static WAYFINDER_ARMOR_TRIM_SMITHING_TEMPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "wayfinder_armor_trim_smithing_template", false, true, []);

    /**
     * @readonly
     */
     static WEATHERED_CHISELED_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "weathered_chiseled_copper", "weathered_chiseled_copper", true, true, []);

    /**
     * @readonly
     */
     static WEATHERED_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "weathered_copper", "weathered_copper", true, true, []);

    /**
     * @readonly
     */
     static WEATHERED_COPPER_BULB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "weathered_copper_bulb", "weathered_copper_bulb", true, true, ["lit", "powered_bit"]);

    /**
     * @readonly
     */
     static WEATHERED_COPPER_DOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "weathered_copper_door", "weathered_copper_door", true, true, ["direction", "door_hinge_bit", "open_bit", "upper_block_bit"]);

    /**
     * @readonly
     */
     static WEATHERED_COPPER_GRATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "weathered_copper_grate", "weathered_copper_grate", true, true, []);

    /**
     * @readonly
     */
     static WEATHERED_COPPER_TRAPDOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "weathered_copper_trapdoor", "weathered_copper_trapdoor", true, true, ["direction", "open_bit", "upside_down_bit"]);

    /**
     * @readonly
     */
     static WEATHERED_CUT_COPPER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "weathered_cut_copper", "weathered_cut_copper", true, true, []);

    /**
     * @readonly
     */
     static WEATHERED_CUT_COPPER_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "weathered_cut_copper_slab", "weathered_cut_copper_slab", true, true, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static WEATHERED_CUT_COPPER_STAIRS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "weathered_cut_copper_stairs", "weathered_cut_copper_stairs", true, true, ["upside_down_bit", "weirdo_direction"]);

    /**
     * @readonly
     */
     static WEB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "web", "web", true, true, []);

    /**
     * @readonly
     */
     static WEEPING_VINES = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "weeping_vines", "weeping_vines", true, true, ["weeping_vines_age"]);

    /**
     * @readonly
     */
     static WHEAT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "wheat", "wheat", true, true, ["growth"]);

    /**
     * @readonly
     */
     static WHEAT_SEEDS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "wheat_seeds", false, true, []);

    /**
     * @readonly
     */
     static WHITE_CANDLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "white_candle", "white_candle", true, true, ["candles", "lit"]);

    /**
     * @readonly
     */
     static WHITE_CARPET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "white_carpet", "white_carpet", true, true, []);

    /**
     * @readonly
     */
     static WHITE_CONCRETE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "white_concrete", "white_concrete", true, true, []);

    /**
     * @readonly
     */
     static WHITE_CONCRETE_POWDER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "white_concrete_powder", "white_concrete_powder", true, true, []);

    /**
     * @readonly
     */
     static WHITE_DYE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "white_dye", false, true, []);

    /**
     * @readonly
     */
     static WHITE_GLAZED_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "white_glazed_terracotta", "white_glazed_terracotta", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static WHITE_SHULKER_BOX = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "white_shulker_box", "white_shulker_box", true, true, []);

    /**
     * @readonly
     */
     static WHITE_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "white_stained_glass", "white_stained_glass", true, true, []);

    /**
     * @readonly
     */
     static WHITE_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "white_stained_glass_pane", "white_stained_glass_pane", true, true, []);

    /**
     * @readonly
     */
     static WHITE_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "white_terracotta", "white_terracotta", true, true, []);

    /**
     * @readonly
     */
     static WHITE_TULIP = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "white_tulip", "white_tulip", true, true, []);

    /**
     * @readonly
     */
     static WHITE_WOOL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "white_wool", "white_wool", true, true, []);

    /**
     * @readonly
     */
     static WILD_ARMOR_TRIM_SMITHING_TEMPLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "wild_armor_trim_smithing_template", false, true, []);

    /**
     * @readonly
     */
     static WIND_CHARGE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "wind_charge", false, true, []);

    /**
     * @readonly
     */
     static WITCH_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "witch_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static WITHER_ROSE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "wither_rose", "wither_rose", true, true, []);

    /**
     * @readonly
     */
     static WITHER_SKELETON_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "wither_skeleton_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static WITHER_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "wither_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static WOLF_ARMOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "wolf_armor", false, true, []);

    /**
     * @readonly
     */
     static WOLF_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "wolf_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static WOOD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "wood", false, true, []);

    /**
     * @readonly
     */
     static WOODEN_AXE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "wooden_axe", false, true, []);

    /**
     * @readonly
     */
     static WOODEN_BUTTON = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "wooden_button", "wooden_button", true, true, ["button_pressed_bit", "facing_direction"]);

    /**
     * @readonly
     */
     static WOODEN_DOOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "wooden_door", "wooden_door", true, true, ["direction", "door_hinge_bit", "open_bit", "upper_block_bit"]);

    /**
     * @readonly
     */
     static WOODEN_HOE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "wooden_hoe", false, true, []);

    /**
     * @readonly
     */
     static WOODEN_PICKAXE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "wooden_pickaxe", false, true, []);

    /**
     * @readonly
     */
     static WOODEN_PRESSURE_PLATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "wooden_pressure_plate", "wooden_pressure_plate", true, true, ["redstone_signal"]);

    /**
     * @readonly
     */
     static WOODEN_SHOVEL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "wooden_shovel", false, true, []);

    /**
     * @readonly
     */
     static WOODEN_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "wooden_slab", false, true, []);

    /**
     * @readonly
     */
     static WOODEN_SWORD = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "wooden_sword", false, true, []);

    /**
     * @readonly
     */
     static WOOL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "wool", false, true, []);

    /**
     * @readonly
     */
     static WRITABLE_BOOK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "writable_book", false, true, []);

    /**
     * @readonly
     */
     static YELLOW_CANDLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "yellow_candle", "yellow_candle", true, true, ["candles", "lit"]);

    /**
     * @readonly
     */
     static YELLOW_CARPET = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "yellow_carpet", "yellow_carpet", true, true, []);

    /**
     * @readonly
     */
     static YELLOW_CONCRETE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "yellow_concrete", "yellow_concrete", true, true, []);

    /**
     * @readonly
     */
     static YELLOW_CONCRETE_POWDER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "yellow_concrete_powder", "yellow_concrete_powder", true, true, []);

    /**
     * @readonly
     */
     static YELLOW_DYE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "yellow_dye", false, true, []);

    /**
     * @readonly
     */
     static YELLOW_FLOWER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "yellow_flower", "yellow_flower", true, true, []);

    /**
     * @readonly
     */
     static YELLOW_GLAZED_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "yellow_glazed_terracotta", "yellow_glazed_terracotta", true, true, ["facing_direction"]);

    /**
     * @readonly
     */
     static YELLOW_SHULKER_BOX = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "yellow_shulker_box", "yellow_shulker_box", true, true, []);

    /**
     * @readonly
     */
     static YELLOW_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "yellow_stained_glass", "yellow_stained_glass", true, true, []);

    /**
     * @readonly
     */
     static YELLOW_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "yellow_stained_glass_pane", "yellow_stained_glass_pane", true, true, []);

    /**
     * @readonly
     */
     static YELLOW_TERRACOTTA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "yellow_terracotta", "yellow_terracotta", true, true, []);

    /**
     * @readonly
     */
     static YELLOW_WOOL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "yellow_wool", "yellow_wool", true, true, []);

    /**
     * @readonly
     */
     static ZOGLIN_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "zoglin_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static ZOMBIE_HORSE_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "zombie_horse_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static ZOMBIE_PIGMAN_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "zombie_pigman_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static ZOMBIE_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "zombie_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static ZOMBIE_VILLAGER_SPAWN_EGG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, null, "zombie_villager_spawn_egg", false, true, []);

    /**
     * @readonly
     */
     static ACACIA_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "acacia_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static ACACIA_STANDING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "acacia_standing_sign", null, true, false, ["ground_sign_direction"]);

    /**
     * @readonly
     */
     static ACACIA_WALL_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "acacia_wall_sign", null, true, false, ["facing_direction"]);

    /**
     * @readonly
     */
     static BAMBOO_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bamboo_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static BAMBOO_MOSAIC_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bamboo_mosaic_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static BAMBOO_SAPLING = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bamboo_sapling", null, true, false, ["age_bit"]);

    /**
     * @readonly
     */
     static BAMBOO_STANDING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bamboo_standing_sign", null, true, false, ["ground_sign_direction"]);

    /**
     * @readonly
     */
     static BAMBOO_WALL_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bamboo_wall_sign", null, true, false, ["facing_direction"]);

    /**
     * @readonly
     */
     static BIRCH_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "birch_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static BIRCH_STANDING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "birch_standing_sign", null, true, false, ["ground_sign_direction"]);

    /**
     * @readonly
     */
     static BIRCH_WALL_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "birch_wall_sign", null, true, false, ["facing_direction"]);

    /**
     * @readonly
     */
     static BLACK_CANDLE_CAKE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "black_candle_cake", null, true, false, ["lit"]);

    /**
     * @readonly
     */
     static BLACKSTONE_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "blackstone_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static BLUE_CANDLE_CAKE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "blue_candle_cake", null, true, false, ["lit"]);

    /**
     * @readonly
     */
     static BROWN_CANDLE_CAKE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "brown_candle_cake", null, true, false, ["lit"]);

    /**
     * @readonly
     */
     static BUBBLE_COLUMN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "bubble_column", null, true, false, ["drag_down"]);

    /**
     * @readonly
     */
     static CAMERA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "camera", null, true, false, []);

    /**
     * @readonly
     */
     static CANDLE_CAKE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "candle_cake", null, true, false, ["lit"]);

    /**
     * @readonly
     */
     static CAVE_VINES = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cave_vines", null, true, false, ["growing_plant_age"]);

    /**
     * @readonly
     */
     static CAVE_VINES_BODY_WITH_BERRIES = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cave_vines_body_with_berries", null, true, false, ["growing_plant_age"]);

    /**
     * @readonly
     */
     static CAVE_VINES_HEAD_WITH_BERRIES = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cave_vines_head_with_berries", null, true, false, ["growing_plant_age"]);

    /**
     * @readonly
     */
     static CHEMICAL_HEAT = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "chemical_heat", null, true, false, []);

    /**
     * @readonly
     */
     static CHEMISTRY_TABLE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "chemistry_table", null, true, false, ["chemistry_table_type", "direction"]);

    /**
     * @readonly
     */
     static CHERRY_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cherry_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static CHERRY_STANDING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cherry_standing_sign", null, true, false, ["ground_sign_direction"]);

    /**
     * @readonly
     */
     static CHERRY_WALL_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cherry_wall_sign", null, true, false, ["facing_direction"]);

    /**
     * @readonly
     */
     static CLIENT_REQUEST_PLACEHOLDER_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "client_request_placeholder_block", null, true, false, []);

    /**
     * @readonly
     */
     static COBBLED_DEEPSLATE_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cobbled_deepslate_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static COCOA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cocoa", null, true, false, ["age", "direction"]);

    /**
     * @readonly
     */
     static COLORED_TORCH_BP = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "colored_torch_bp", null, true, false, ["color_bit", "torch_facing_direction"]);

    /**
     * @readonly
     */
     static COLORED_TORCH_RG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "colored_torch_rg", null, true, false, ["color_bit", "torch_facing_direction"]);

    /**
     * @readonly
     */
     static CORAL_FAN_HANG = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "coral_fan_hang", null, true, false, ["coral_direction", "coral_hang_type_bit", "dead_bit"]);

    /**
     * @readonly
     */
     static CORAL_FAN_HANG2 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "coral_fan_hang2", null, true, false, ["coral_direction", "coral_hang_type_bit", "dead_bit"]);

    /**
     * @readonly
     */
     static CORAL_FAN_HANG3 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "coral_fan_hang3", null, true, false, ["coral_direction", "coral_hang_type_bit", "dead_bit"]);

    /**
     * @readonly
     */
     static CRIMSON_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "crimson_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static CRIMSON_STANDING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "crimson_standing_sign", null, true, false, ["ground_sign_direction"]);

    /**
     * @readonly
     */
     static CRIMSON_WALL_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "crimson_wall_sign", null, true, false, ["facing_direction"]);

    /**
     * @readonly
     */
     static CYAN_CANDLE_CAKE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "cyan_candle_cake", null, true, false, ["lit"]);

    /**
     * @readonly
     */
     static DARK_OAK_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "dark_oak_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static DARKOAK_STANDING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "darkoak_standing_sign", null, true, false, ["ground_sign_direction"]);

    /**
     * @readonly
     */
     static DARKOAK_WALL_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "darkoak_wall_sign", null, true, false, ["facing_direction"]);

    /**
     * @readonly
     */
     static DAYLIGHT_DETECTOR_INVERTED = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "daylight_detector_inverted", null, true, false, ["redstone_signal"]);

    /**
     * @readonly
     */
     static DEEPSLATE_BRICK_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "deepslate_brick_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static DEEPSLATE_TILE_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "deepslate_tile_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static DOUBLE_CUT_COPPER_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "double_cut_copper_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static DOUBLE_STONE_BLOCK_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "double_stone_block_slab", null, true, false, ["minecraft:vertical_half", "stone_slab_type"]);

    /**
     * @readonly
     */
     static DOUBLE_STONE_BLOCK_SLAB2 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "double_stone_block_slab2", null, true, false, ["minecraft:vertical_half", "stone_slab_type_2"]);

    /**
     * @readonly
     */
     static DOUBLE_STONE_BLOCK_SLAB3 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "double_stone_block_slab3", null, true, false, ["minecraft:vertical_half", "stone_slab_type_3"]);

    /**
     * @readonly
     */
     static DOUBLE_STONE_BLOCK_SLAB4 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "double_stone_block_slab4", null, true, false, ["minecraft:vertical_half", "stone_slab_type_4"]);

    /**
     * @readonly
     */
     static ELEMENT_0 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_0", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_1 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_1", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_10 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_10", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_100 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_100", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_101 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_101", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_102 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_102", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_103 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_103", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_104 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_104", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_105 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_105", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_106 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_106", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_107 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_107", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_108 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_108", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_109 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_109", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_11 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_11", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_110 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_110", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_111 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_111", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_112 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_112", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_113 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_113", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_114 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_114", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_115 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_115", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_116 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_116", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_117 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_117", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_118 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_118", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_12 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_12", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_13 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_13", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_14 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_14", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_15 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_15", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_16 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_16", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_17 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_17", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_18 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_18", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_19 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_19", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_2 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_2", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_20 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_20", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_21 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_21", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_22 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_22", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_23 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_23", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_24 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_24", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_25 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_25", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_26 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_26", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_27 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_27", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_28 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_28", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_29 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_29", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_3 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_3", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_30 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_30", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_31 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_31", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_32 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_32", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_33 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_33", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_34 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_34", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_35 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_35", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_36 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_36", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_37 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_37", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_38 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_38", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_39 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_39", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_4 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_4", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_40 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_40", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_41 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_41", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_42 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_42", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_43 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_43", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_44 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_44", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_45 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_45", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_46 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_46", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_47 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_47", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_48 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_48", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_49 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_49", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_5 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_5", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_50 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_50", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_51 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_51", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_52 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_52", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_53 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_53", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_54 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_54", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_55 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_55", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_56 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_56", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_57 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_57", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_58 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_58", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_59 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_59", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_6 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_6", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_60 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_60", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_61 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_61", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_62 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_62", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_63 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_63", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_64 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_64", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_65 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_65", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_66 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_66", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_67 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_67", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_68 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_68", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_69 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_69", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_7 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_7", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_70 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_70", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_71 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_71", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_72 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_72", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_73 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_73", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_74 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_74", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_75 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_75", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_76 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_76", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_77 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_77", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_78 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_78", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_79 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_79", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_8 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_8", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_80 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_80", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_81 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_81", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_82 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_82", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_83 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_83", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_84 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_84", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_85 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_85", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_86 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_86", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_87 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_87", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_88 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_88", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_89 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_89", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_9 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_9", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_90 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_90", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_91 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_91", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_92 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_92", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_93 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_93", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_94 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_94", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_95 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_95", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_96 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_96", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_97 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_97", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_98 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_98", null, true, false, []);

    /**
     * @readonly
     */
     static ELEMENT_99 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "element_99", null, true, false, []);

    /**
     * @readonly
     */
     static END_GATEWAY = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "end_gateway", null, true, false, []);

    /**
     * @readonly
     */
     static END_PORTAL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "end_portal", null, true, false, []);

    /**
     * @readonly
     */
     static EXPOSED_DOUBLE_CUT_COPPER_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "exposed_double_cut_copper_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static FIRE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "fire",  null, true, false, ["age"], true);

    /**
     * @readonly
     */
     static FLOWING_LAVA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "flowing_lava", null, true, false, ["liquid_depth"], true);

    /**
     * @readonly
     */
     static FLOWING_WATER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "flowing_water", null, true, false, ["liquid_depth"], true);

    /**
     * @readonly
     */
     static GLOWINGOBSIDIAN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "glowingobsidian", null, true, false, []);

    /**
     * @readonly
     */
     static GRAY_CANDLE_CAKE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "gray_candle_cake", null, true, false, ["lit"]);

    /**
     * @readonly
     */
     static GREEN_CANDLE_CAKE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "green_candle_cake", null, true, false, ["lit"]);

    /**
     * @readonly
     */
     static HARD_BLACK_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_black_stained_glass", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_BLACK_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_black_stained_glass_pane", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_BLUE_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_blue_stained_glass", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_BLUE_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_blue_stained_glass_pane", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_BROWN_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_brown_stained_glass", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_BROWN_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_brown_stained_glass_pane", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_CYAN_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_cyan_stained_glass", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_CYAN_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_cyan_stained_glass_pane", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_glass", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_glass_pane", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_GRAY_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_gray_stained_glass", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_GRAY_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_gray_stained_glass_pane", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_GREEN_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_green_stained_glass", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_GREEN_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_green_stained_glass_pane", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_LIGHT_BLUE_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_light_blue_stained_glass", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_LIGHT_BLUE_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_light_blue_stained_glass_pane", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_LIGHT_GRAY_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_light_gray_stained_glass", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_LIGHT_GRAY_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_light_gray_stained_glass_pane", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_LIME_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_lime_stained_glass", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_LIME_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_lime_stained_glass_pane", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_MAGENTA_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_magenta_stained_glass", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_MAGENTA_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_magenta_stained_glass_pane", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_ORANGE_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_orange_stained_glass", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_ORANGE_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_orange_stained_glass_pane", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_PINK_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_pink_stained_glass", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_PINK_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_pink_stained_glass_pane", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_PURPLE_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_purple_stained_glass", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_PURPLE_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_purple_stained_glass_pane", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_RED_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_red_stained_glass", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_RED_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_red_stained_glass_pane", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_WHITE_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_white_stained_glass", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_WHITE_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_white_stained_glass_pane", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_YELLOW_STAINED_GLASS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_yellow_stained_glass", null, true, false, []);

    /**
     * @readonly
     */
     static HARD_YELLOW_STAINED_GLASS_PANE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "hard_yellow_stained_glass_pane", null, true, false, []);

    /**
     * @readonly
     */
     static INFO_UPDATE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "info_update", null, true, false, []);

    /**
     * @readonly
     */
     static INFO_UPDATE2 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "info_update2", null, true, false, []);

    /**
     * @readonly
     */
     static INVISIBLE_BEDROCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "invisible_bedrock", null, true, false, []);

    /**
     * @readonly
     */
     static JUNGLE_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "jungle_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static JUNGLE_STANDING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "jungle_standing_sign", null, true, false, ["ground_sign_direction"]);

    /**
     * @readonly
     */
     static JUNGLE_WALL_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "jungle_wall_sign", null, true, false, ["facing_direction"]);

    /**
     * @readonly
     */
     static LAVA = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lava", null, true, true, ["liquid_depth"], true);

    /**
     * @readonly
     */
     static LIGHT_BLUE_CANDLE_CAKE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_blue_candle_cake", null, true, false, ["lit"]);

    /**
     * @readonly
     */
     static LIGHT_GRAY_CANDLE_CAKE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "light_gray_candle_cake", null, true, false, ["lit"]);

    /**
     * @readonly
     */
     static LIME_CANDLE_CAKE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lime_candle_cake", null, true, false, ["lit"]);

    /**
     * @readonly
     */
     static LIT_BLAST_FURNACE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lit_blast_furnace", null, true, false, ["minecraft:cardinal_direction"]);

    /**
     * @readonly
     */
     static LIT_DEEPSLATE_REDSTONE_ORE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lit_deepslate_redstone_ore", null, true, false, []);

    /**
     * @readonly
     */
     static LIT_FURNACE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lit_furnace", null, true, false, ["minecraft:cardinal_direction"]);

    /**
     * @readonly
     */
     static LIT_REDSTONE_LAMP = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lit_redstone_lamp", null, true, false, []);

    /**
     * @readonly
     */
     static LIT_REDSTONE_ORE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lit_redstone_ore", null, true, false, []);

    /**
     * @readonly
     */
     static LIT_SMOKER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "lit_smoker", null, true, false, ["minecraft:cardinal_direction"]);

    /**
     * @readonly
     */
     static MAGENTA_CANDLE_CAKE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "magenta_candle_cake", null, true, false, ["lit"]);

    /**
     * @readonly
     */
     static MANGROVE_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mangrove_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static MANGROVE_STANDING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mangrove_standing_sign", null, true, false, ["ground_sign_direction"]);

    /**
     * @readonly
     */
     static MANGROVE_WALL_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mangrove_wall_sign", null, true, false, ["facing_direction"]);

    /**
     * @readonly
     */
     static MELON_STEM = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "melon_stem", null, true, false, ["facing_direction", "growth"]);

    /**
     * @readonly
     */
     static MOVING_BLOCK = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "moving_block", null, true, false, []);

    /**
     * @readonly
     */
     static MUD_BRICK_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "mud_brick_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static NETHERREACTOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "netherreactor", null, true, false, []);

    /**
     * @readonly
     */
     static OAK_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "oak_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static ORANGE_CANDLE_CAKE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "orange_candle_cake", null, true, false, ["lit"]);

    /**
     * @readonly
     */
     static OXIDIZED_DOUBLE_CUT_COPPER_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "oxidized_double_cut_copper_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static PINK_CANDLE_CAKE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "pink_candle_cake", null, true, false, ["lit"]);

    /**
     * @readonly
     */
     static PISTON_ARM_COLLISION = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "piston_arm_collision", null, true, false, ["facing_direction"]);

    /**
     * @readonly
     */
     static PITCHER_CROP = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "pitcher_crop", null, true, false, ["growth", "upper_block_bit"]);

    /**
     * @readonly
     */
     static POLISHED_BLACKSTONE_BRICK_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_blackstone_brick_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static POLISHED_BLACKSTONE_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_blackstone_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static POLISHED_DEEPSLATE_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_deepslate_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static POLISHED_TUFF_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "polished_tuff_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static PORTAL = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "portal", null, true, false, ["portal_axis"]);

    /**
     * @readonly
     */
     static POWDER_SNOW = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "powder_snow", null, true, false, []);

    /**
     * @readonly
     */
     static POWERED_COMPARATOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "powered_comparator", null, true, false, ["minecraft:cardinal_direction", "output_lit_bit", "output_subtract_bit"]);

    /**
     * @readonly
     */
     static POWERED_REPEATER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "powered_repeater", null, true, false, ["minecraft:cardinal_direction", "repeater_delay"]);

    /**
     * @readonly
     */
     static PUMPKIN_STEM = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "pumpkin_stem", null, true, false, ["facing_direction", "growth"]);

    /**
     * @readonly
     */
     static PURPLE_CANDLE_CAKE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "purple_candle_cake", null, true, false, ["lit"]);

    /**
     * @readonly
     */
     static RED_CANDLE_CAKE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "red_candle_cake", null, true, false, ["lit"]);

    /**
     * @readonly
     */
     static REDSTONE_WIRE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "redstone_wire", null, true, false, ["redstone_signal"]);

    /**
     * @readonly
     */
     static REEDS = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "reeds", null, true, false, ["age"]);

    /**
     * @readonly
     */
     static RESERVED6 = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "reserved6", null, true, false, []);

    /**
     * @readonly
     */
     static SOUL_FIRE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "soul_fire", null, true, false, ["age"]);

    /**
     * @readonly
     */
     static SPRUCE_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "spruce_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static SPRUCE_STANDING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "spruce_standing_sign", null, true, false, ["ground_sign_direction"]);

    /**
     * @readonly
     */
     static SPRUCE_WALL_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "spruce_wall_sign", null, true, false, ["facing_direction"]);

    /**
     * @readonly
     */
     static STANDING_BANNER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "standing_banner", null, true, false, ["ground_sign_direction"]);

    /**
     * @readonly
     */
     static STANDING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "standing_sign", null, true, false, ["ground_sign_direction"]);

    /**
     * @readonly
     */
     static STICKY_PISTON_ARM_COLLISION = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "sticky_piston_arm_collision", null, true, false, ["facing_direction"]);

    /**
     * @readonly
     */
     static STONECUTTER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "stonecutter", null, true, false, []);

    /**
     * @readonly
     */
     static TORCHFLOWER_CROP = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "torchflower_crop", null, true, false, ["growth"]);

    /**
     * @readonly
     */
     static TRIP_WIRE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "trip_wire", null, true, false, ["attached_bit", "disarmed_bit", "powered_bit", "suspended_bit"]);

    /**
     * @readonly
     */
     static TUFF_BRICK_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "tuff_brick_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static TUFF_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "tuff_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static UNDERWATER_TORCH = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "underwater_torch", null, true, false, ["torch_facing_direction"]);

    /**
     * @readonly
     */
     static UNKNOWN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "unknown", null, true, false, []);

    /**
     * @readonly
     */
     static UNLIT_REDSTONE_TORCH = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "unlit_redstone_torch", null, true, false, ["torch_facing_direction"]);

    /**
     * @readonly
     */
     static UNPOWERED_COMPARATOR = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "unpowered_comparator", null, true, false, ["minecraft:cardinal_direction", "output_lit_bit", "output_subtract_bit"]);

    /**
     * @readonly
     */
     static UNPOWERED_REPEATER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "unpowered_repeater", null, true, false, ["minecraft:cardinal_direction", "repeater_delay"]);

    /**
     * @readonly
     */
     static WALL_BANNER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "wall_banner", null, true, false, ["facing_direction"]);

    /**
     * @readonly
     */
     static WALL_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "wall_sign", null, true, false, ["facing_direction"]);

    /**
     * @readonly
     */
     static WARPED_DOUBLE_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "warped_double_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static WARPED_STANDING_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "warped_standing_sign", null, true, false, ["ground_sign_direction"]);

    /**
     * @readonly
     */
     static WARPED_WALL_SIGN = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "warped_wall_sign", null, true, false, ["facing_direction"]);

    /**
     * @readonly
     */
     static WATER = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "water", null, true, false, ["liquid_depth"], true);

    /**
     * @readonly
     */
     static WAXED_DOUBLE_CUT_COPPER_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_double_cut_copper_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static WAXED_EXPOSED_DOUBLE_CUT_COPPER_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_exposed_double_cut_copper_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static WAXED_OXIDIZED_DOUBLE_CUT_COPPER_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_oxidized_double_cut_copper_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static WAXED_WEATHERED_DOUBLE_CUT_COPPER_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "waxed_weathered_double_cut_copper_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static WEATHERED_DOUBLE_CUT_COPPER_SLAB = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "weathered_double_cut_copper_slab", null, true, false, ["minecraft:vertical_half"]);

    /**
     * @readonly
     */
     static WHITE_CANDLE_CAKE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "white_candle_cake", null, true, false, ["lit"]);

    /**
     * @readonly
     */
     static YELLOW_CANDLE_CAKE = new this(PRIVATE_CONSTRUCTOR_SYMBOL, "yellow_candle_cake", null, true, false, ["lit"]);

}

/**
 * いじらないことを推奨
 */
const bukkitOut = {
    "compostables": [
        "oak_sapling",
        "spruce_sapling",
        "birch_sapling",
        "jungle_sapling",
        "acacia_sapling",
        "cherry_sapling",
        "dark_oak_sapling",
        "mangrove_propagule",
        "mangrove_roots",
        "oak_leaves",
        "spruce_leaves",
        "birch_leaves",
        "jungle_leaves",
        "acacia_leaves",
        "cherry_leaves",
        "dark_oak_leaves",
        "mangrove_leaves",
        "azalea_leaves",
        "flowering_azalea_leaves",
        "short_grass",
        "fern",
        "azalea",
        "flowering_azalea",
        "seagrass",
        "sea_pickle",
        "dandelion",
        "poppy",
        "blue_orchid",
        "allium",
        "azure_bluet",
        "red_tulip",
        "orange_tulip",
        "white_tulip",
        "pink_tulip",
        "oxeye_daisy",
        "cornflower",
        "lily_of_the_valley",
        "wither_rose",
        "torchflower",
        "pitcher_plant",
        "spore_blossom",
        "brown_mushroom",
        "red_mushroom",
        "crimson_fungus",
        "warped_fungus",
        "crimson_roots",
        "warped_roots",
        "nether_sprouts",
        "weeping_vines",
        "twisting_vines",
        "sugar_cane",
        "kelp",
        "moss_carpet",
        "pink_petals",
        "moss_block",
        "hanging_roots",
        "big_dripleaf",
        "small_dripleaf",
        "cactus",
        "pumpkin",
        "carved_pumpkin",
        "brown_mushroom_block",
        "red_mushroom_block",
        "mushroom_stem",
        "melon",
        "vine",
        "glow_lichen",
        "lily_pad",
        "hay_block",
        "sunflower",
        "lilac",
        "rose_bush",
        "peony",
        "tall_grass",
        "large_fern",
        "nether_wart_block",
        "warped_wart_block",
        "apple",
        "wheat_seeds",
        "wheat",
        "bread",
        "dried_kelp_block",
        "cocoa_beans",
        "cake",
        "cookie",
        "melon_slice",
        "dried_kelp",
        "pumpkin_seeds",
        "melon_seeds",
        "nether_wart",
        "carrot",
        "potato",
        "baked_potato",
        "pumpkin_pie",
        "torchflower_seeds",
        "pitcher_pod",
        "beetroot",
        "beetroot_seeds",
        "sweet_berries",
        "glow_berries",
        "shroomlight"
    ],
    "foods": [
        "apple",
        "mushroom_stew",
        "bread",
        "porkchop",
        "cooked_porkchop",
        "golden_apple",
        "enchanted_golden_apple",
        "cod",
        "salmon",
        "tropical_fish",
        "pufferfish",
        "cooked_cod",
        "cooked_salmon",
        "cookie",
        "melon_slice",
        "dried_kelp",
        "beef",
        "cooked_beef",
        "chicken",
        "cooked_chicken",
        "rotten_flesh",
        "spider_eye",
        "carrot",
        "potato",
        "baked_potato",
        "poisonous_potato",
        "golden_carrot",
        "pumpkin_pie",
        "rabbit",
        "cooked_rabbit",
        "rabbit_stew",
        "mutton",
        "cooked_mutton",
        "chorus_fruit",
        "beetroot",
        "beetroot_soup",
        "suspicious_stew",
        "sweet_berries",
        "glow_berries",
        "honey_bottle",
        "ominous_bottle"
    ],
    "solids": [
        "stone",
        "granite",
        "polished_granite",
        "diorite",
        "polished_diorite",
        "andesite",
        "polished_andesite",
        "deepslate",
        "cobbled_deepslate",
        "polished_deepslate",
        "calcite",
        "tuff",
        "tuff_slab",
        "tuff_stairs",
        "tuff_wall",
        "chiseled_tuff",
        "polished_tuff",
        "polished_tuff_slab",
        "polished_tuff_stairs",
        "polished_tuff_wall",
        "tuff_bricks",
        "tuff_brick_slab",
        "tuff_brick_stairs",
        "tuff_brick_wall",
        "chiseled_tuff_bricks",
        "dripstone_block",
        "grass_block",
        "dirt",
        "coarse_dirt",
        "podzol",
        "rooted_dirt",
        "mud",
        "crimson_nylium",
        "warped_nylium",
        "cobblestone",
        "oak_planks",
        "spruce_planks",
        "birch_planks",
        "jungle_planks",
        "acacia_planks",
        "cherry_planks",
        "dark_oak_planks",
        "mangrove_planks",
        "bamboo_planks",
        "crimson_planks",
        "warped_planks",
        "bamboo_mosaic",
        "bedrock",
        "sand",
        "suspicious_sand",
        "suspicious_gravel",
        "red_sand",
        "gravel",
        "coal_ore",
        "deepslate_coal_ore",
        "iron_ore",
        "deepslate_iron_ore",
        "copper_ore",
        "deepslate_copper_ore",
        "gold_ore",
        "deepslate_gold_ore",
        "redstone_ore",
        "deepslate_redstone_ore",
        "emerald_ore",
        "deepslate_emerald_ore",
        "lapis_ore",
        "deepslate_lapis_ore",
        "diamond_ore",
        "deepslate_diamond_ore",
        "nether_gold_ore",
        "nether_quartz_ore",
        "ancient_debris",
        "coal_block",
        "raw_iron_block",
        "raw_copper_block",
        "raw_gold_block",
        "amethyst_block",
        "budding_amethyst",
        "iron_block",
        "copper_block",
        "gold_block",
        "diamond_block",
        "netherite_block",
        "exposed_copper",
        "weathered_copper",
        "oxidized_copper",
        "chiseled_copper",
        "exposed_chiseled_copper",
        "weathered_chiseled_copper",
        "oxidized_chiseled_copper",
        "cut_copper",
        "exposed_cut_copper",
        "weathered_cut_copper",
        "oxidized_cut_copper",
        "cut_copper_stairs",
        "exposed_cut_copper_stairs",
        "weathered_cut_copper_stairs",
        "oxidized_cut_copper_stairs",
        "cut_copper_slab",
        "exposed_cut_copper_slab",
        "weathered_cut_copper_slab",
        "oxidized_cut_copper_slab",
        "waxed_copper_block",
        "waxed_exposed_copper",
        "waxed_weathered_copper",
        "waxed_oxidized_copper",
        "waxed_chiseled_copper",
        "waxed_exposed_chiseled_copper",
        "waxed_weathered_chiseled_copper",
        "waxed_oxidized_chiseled_copper",
        "waxed_cut_copper",
        "waxed_exposed_cut_copper",
        "waxed_weathered_cut_copper",
        "waxed_oxidized_cut_copper",
        "waxed_cut_copper_stairs",
        "waxed_exposed_cut_copper_stairs",
        "waxed_weathered_cut_copper_stairs",
        "waxed_oxidized_cut_copper_stairs",
        "waxed_cut_copper_slab",
        "waxed_exposed_cut_copper_slab",
        "waxed_weathered_cut_copper_slab",
        "waxed_oxidized_cut_copper_slab",
        "oak_log",
        "spruce_log",
        "birch_log",
        "jungle_log",
        "acacia_log",
        "cherry_log",
        "dark_oak_log",
        "mangrove_log",
        "mangrove_roots",
        "muddy_mangrove_roots",
        "crimson_stem",
        "warped_stem",
        "bamboo_block",
        "stripped_oak_log",
        "stripped_spruce_log",
        "stripped_birch_log",
        "stripped_jungle_log",
        "stripped_acacia_log",
        "stripped_cherry_log",
        "stripped_dark_oak_log",
        "stripped_mangrove_log",
        "stripped_crimson_stem",
        "stripped_warped_stem",
        "stripped_oak_wood",
        "stripped_spruce_wood",
        "stripped_birch_wood",
        "stripped_jungle_wood",
        "stripped_acacia_wood",
        "stripped_cherry_wood",
        "stripped_dark_oak_wood",
        "stripped_mangrove_wood",
        "stripped_crimson_hyphae",
        "stripped_warped_hyphae",
        "stripped_bamboo_block",
        "oak_wood",
        "spruce_wood",
        "birch_wood",
        "jungle_wood",
        "acacia_wood",
        "cherry_wood",
        "dark_oak_wood",
        "mangrove_wood",
        "crimson_hyphae",
        "warped_hyphae",
        "oak_leaves",
        "spruce_leaves",
        "birch_leaves",
        "jungle_leaves",
        "acacia_leaves",
        "cherry_leaves",
        "dark_oak_leaves",
        "mangrove_leaves",
        "azalea_leaves",
        "flowering_azalea_leaves",
        "sponge",
        "wet_sponge",
        "glass",
        "tinted_glass",
        "lapis_block",
        "sandstone",
        "chiseled_sandstone",
        "cut_sandstone",
        "white_wool",
        "orange_wool",
        "magenta_wool",
        "light_blue_wool",
        "yellow_wool",
        "lime_wool",
        "pink_wool",
        "gray_wool",
        "light_gray_wool",
        "cyan_wool",
        "purple_wool",
        "blue_wool",
        "brown_wool",
        "green_wool",
        "red_wool",
        "black_wool",
        "moss_block",
        "bamboo",
        "oak_slab",
        "spruce_slab",
        "birch_slab",
        "jungle_slab",
        "acacia_slab",
        "cherry_slab",
        "dark_oak_slab",
        "mangrove_slab",
        "bamboo_slab",
        "bamboo_mosaic_slab",
        "crimson_slab",
        "warped_slab",
        "stone_slab",
        "smooth_stone_slab",
        "sandstone_slab",
        "cut_sandstone_slab",
        "petrified_oak_slab",
        "cobblestone_slab",
        "brick_slab",
        "stone_brick_slab",
        "mud_brick_slab",
        "nether_brick_slab",
        "quartz_slab",
        "red_sandstone_slab",
        "cut_red_sandstone_slab",
        "purpur_slab",
        "prismarine_slab",
        "prismarine_brick_slab",
        "dark_prismarine_slab",
        "smooth_quartz",
        "smooth_red_sandstone",
        "smooth_sandstone",
        "smooth_stone",
        "bricks",
        "bookshelf",
        "chiseled_bookshelf",
        "decorated_pot",
        "mossy_cobblestone",
        "obsidian",
        "purpur_block",
        "purpur_pillar",
        "purpur_stairs",
        "spawner",
        "chest",
        "crafting_table",
        "farmland",
        "furnace",
        "cobblestone_stairs",
        "ice",
        "snow_block",
        "cactus",
        "clay",
        "jukebox",
        "oak_fence",
        "spruce_fence",
        "birch_fence",
        "jungle_fence",
        "acacia_fence",
        "cherry_fence",
        "dark_oak_fence",
        "mangrove_fence",
        "bamboo_fence",
        "crimson_fence",
        "warped_fence",
        "pumpkin",
        "carved_pumpkin",
        "jack_o_lantern",
        "netherrack",
        "soul_sand",
        "soul_soil",
        "basalt",
        "polished_basalt",
        "smooth_basalt",
        "glowstone",
        "infested_stone",
        "infested_cobblestone",
        "infested_stone_bricks",
        "infested_mossy_stone_bricks",
        "infested_cracked_stone_bricks",
        "infested_chiseled_stone_bricks",
        "infested_deepslate",
        "stone_bricks",
        "mossy_stone_bricks",
        "cracked_stone_bricks",
        "chiseled_stone_bricks",
        "packed_mud",
        "mud_bricks",
        "deepslate_bricks",
        "cracked_deepslate_bricks",
        "deepslate_tiles",
        "cracked_deepslate_tiles",
        "chiseled_deepslate",
        "reinforced_deepslate",
        "brown_mushroom_block",
        "red_mushroom_block",
        "mushroom_stem",
        "iron_bars",
        "chain",
        "glass_pane",
        "melon",
        "brick_stairs",
        "stone_brick_stairs",
        "mud_brick_stairs",
        "mycelium",
        "nether_bricks",
        "cracked_nether_bricks",
        "chiseled_nether_bricks",
        "nether_brick_fence",
        "nether_brick_stairs",
        "sculk",
        "sculk_vein",
        "sculk_catalyst",
        "sculk_shrieker",
        "enchanting_table",
        "end_portal_frame",
        "end_stone",
        "end_stone_bricks",
        "dragon_egg",
        "sandstone_stairs",
        "ender_chest",
        "emerald_block",
        "oak_stairs",
        "spruce_stairs",
        "birch_stairs",
        "jungle_stairs",
        "acacia_stairs",
        "cherry_stairs",
        "dark_oak_stairs",
        "mangrove_stairs",
        "bamboo_stairs",
        "bamboo_mosaic_stairs",
        "crimson_stairs",
        "warped_stairs",
        "command_block",
        "beacon",
        "cobblestone_wall",
        "mossy_cobblestone_wall",
        "brick_wall",
        "prismarine_wall",
        "red_sandstone_wall",
        "mossy_stone_brick_wall",
        "granite_wall",
        "stone_brick_wall",
        "mud_brick_wall",
        "nether_brick_wall",
        "andesite_wall",
        "red_nether_brick_wall",
        "sandstone_wall",
        "end_stone_brick_wall",
        "diorite_wall",
        "blackstone_wall",
        "polished_blackstone_wall",
        "polished_blackstone_brick_wall",
        "cobbled_deepslate_wall",
        "polished_deepslate_wall",
        "deepslate_brick_wall",
        "deepslate_tile_wall",
        "anvil",
        "chipped_anvil",
        "damaged_anvil",
        "chiseled_quartz_block",
        "quartz_block",
        "quartz_bricks",
        "quartz_pillar",
        "quartz_stairs",
        "white_terracotta",
        "orange_terracotta",
        "magenta_terracotta",
        "light_blue_terracotta",
        "yellow_terracotta",
        "lime_terracotta",
        "pink_terracotta",
        "gray_terracotta",
        "light_gray_terracotta",
        "cyan_terracotta",
        "purple_terracotta",
        "blue_terracotta",
        "brown_terracotta",
        "green_terracotta",
        "red_terracotta",
        "black_terracotta",
        "barrier",
        "hay_block",
        "terracotta",
        "packed_ice",
        "dirt_path",
        "white_stained_glass",
        "orange_stained_glass",
        "magenta_stained_glass",
        "light_blue_stained_glass",
        "yellow_stained_glass",
        "lime_stained_glass",
        "pink_stained_glass",
        "gray_stained_glass",
        "light_gray_stained_glass",
        "cyan_stained_glass",
        "purple_stained_glass",
        "blue_stained_glass",
        "brown_stained_glass",
        "green_stained_glass",
        "red_stained_glass",
        "black_stained_glass",
        "white_stained_glass_pane",
        "orange_stained_glass_pane",
        "magenta_stained_glass_pane",
        "light_blue_stained_glass_pane",
        "yellow_stained_glass_pane",
        "lime_stained_glass_pane",
        "pink_stained_glass_pane",
        "gray_stained_glass_pane",
        "light_gray_stained_glass_pane",
        "cyan_stained_glass_pane",
        "purple_stained_glass_pane",
        "blue_stained_glass_pane",
        "brown_stained_glass_pane",
        "green_stained_glass_pane",
        "red_stained_glass_pane",
        "black_stained_glass_pane",
        "prismarine",
        "prismarine_bricks",
        "dark_prismarine",
        "prismarine_stairs",
        "prismarine_brick_stairs",
        "dark_prismarine_stairs",
        "sea_lantern",
        "red_sandstone",
        "chiseled_red_sandstone",
        "cut_red_sandstone",
        "red_sandstone_stairs",
        "repeating_command_block",
        "chain_command_block",
        "magma_block",
        "nether_wart_block",
        "warped_wart_block",
        "red_nether_bricks",
        "bone_block",
        "shulker_box",
        "white_shulker_box",
        "orange_shulker_box",
        "magenta_shulker_box",
        "light_blue_shulker_box",
        "yellow_shulker_box",
        "lime_shulker_box",
        "pink_shulker_box",
        "gray_shulker_box",
        "light_gray_shulker_box",
        "cyan_shulker_box",
        "purple_shulker_box",
        "blue_shulker_box",
        "brown_shulker_box",
        "green_shulker_box",
        "red_shulker_box",
        "black_shulker_box",
        "white_glazed_terracotta",
        "orange_glazed_terracotta",
        "magenta_glazed_terracotta",
        "light_blue_glazed_terracotta",
        "yellow_glazed_terracotta",
        "lime_glazed_terracotta",
        "pink_glazed_terracotta",
        "gray_glazed_terracotta",
        "light_gray_glazed_terracotta",
        "cyan_glazed_terracotta",
        "purple_glazed_terracotta",
        "blue_glazed_terracotta",
        "brown_glazed_terracotta",
        "green_glazed_terracotta",
        "red_glazed_terracotta",
        "black_glazed_terracotta",
        "white_concrete",
        "orange_concrete",
        "magenta_concrete",
        "light_blue_concrete",
        "yellow_concrete",
        "lime_concrete",
        "pink_concrete",
        "gray_concrete",
        "light_gray_concrete",
        "cyan_concrete",
        "purple_concrete",
        "blue_concrete",
        "brown_concrete",
        "green_concrete",
        "red_concrete",
        "black_concrete",
        "white_concrete_powder",
        "orange_concrete_powder",
        "magenta_concrete_powder",
        "light_blue_concrete_powder",
        "yellow_concrete_powder",
        "lime_concrete_powder",
        "pink_concrete_powder",
        "gray_concrete_powder",
        "light_gray_concrete_powder",
        "cyan_concrete_powder",
        "purple_concrete_powder",
        "blue_concrete_powder",
        "brown_concrete_powder",
        "green_concrete_powder",
        "red_concrete_powder",
        "black_concrete_powder",
        "turtle_egg",
        "sniffer_egg",
        "dead_tube_coral_block",
        "dead_brain_coral_block",
        "dead_bubble_coral_block",
        "dead_fire_coral_block",
        "dead_horn_coral_block",
        "tube_coral_block",
        "brain_coral_block",
        "bubble_coral_block",
        "fire_coral_block",
        "horn_coral_block",
        "dead_brain_coral",
        "dead_bubble_coral",
        "dead_fire_coral",
        "dead_horn_coral",
        "dead_tube_coral",
        "dead_tube_coral_fan",
        "dead_brain_coral_fan",
        "dead_bubble_coral_fan",
        "dead_fire_coral_fan",
        "dead_horn_coral_fan",
        "blue_ice",
        "conduit",
        "polished_granite_stairs",
        "smooth_red_sandstone_stairs",
        "mossy_stone_brick_stairs",
        "polished_diorite_stairs",
        "mossy_cobblestone_stairs",
        "end_stone_brick_stairs",
        "stone_stairs",
        "smooth_sandstone_stairs",
        "smooth_quartz_stairs",
        "granite_stairs",
        "andesite_stairs",
        "red_nether_brick_stairs",
        "polished_andesite_stairs",
        "diorite_stairs",
        "cobbled_deepslate_stairs",
        "polished_deepslate_stairs",
        "deepslate_brick_stairs",
        "deepslate_tile_stairs",
        "polished_granite_slab",
        "smooth_red_sandstone_slab",
        "mossy_stone_brick_slab",
        "polished_diorite_slab",
        "mossy_cobblestone_slab",
        "end_stone_brick_slab",
        "smooth_sandstone_slab",
        "smooth_quartz_slab",
        "granite_slab",
        "andesite_slab",
        "red_nether_brick_slab",
        "polished_andesite_slab",
        "diorite_slab",
        "cobbled_deepslate_slab",
        "polished_deepslate_slab",
        "deepslate_brick_slab",
        "deepslate_tile_slab",
        "redstone_block",
        "piston",
        "sticky_piston",
        "slime_block",
        "honey_block",
        "observer",
        "hopper",
        "dispenser",
        "dropper",
        "lectern",
        "target",
        "lightning_rod",
        "daylight_detector",
        "sculk_sensor",
        "calibrated_sculk_sensor",
        "trapped_chest",
        "tnt",
        "redstone_lamp",
        "note_block",
        "stone_pressure_plate",
        "polished_blackstone_pressure_plate",
        "light_weighted_pressure_plate",
        "heavy_weighted_pressure_plate",
        "oak_pressure_plate",
        "spruce_pressure_plate",
        "birch_pressure_plate",
        "jungle_pressure_plate",
        "acacia_pressure_plate",
        "cherry_pressure_plate",
        "dark_oak_pressure_plate",
        "mangrove_pressure_plate",
        "bamboo_pressure_plate",
        "crimson_pressure_plate",
        "warped_pressure_plate",
        "iron_door",
        "oak_door",
        "spruce_door",
        "birch_door",
        "jungle_door",
        "acacia_door",
        "cherry_door",
        "dark_oak_door",
        "mangrove_door",
        "bamboo_door",
        "crimson_door",
        "warped_door",
        "copper_door",
        "exposed_copper_door",
        "weathered_copper_door",
        "oxidized_copper_door",
        "waxed_copper_door",
        "waxed_exposed_copper_door",
        "waxed_weathered_copper_door",
        "waxed_oxidized_copper_door",
        "iron_trapdoor",
        "oak_trapdoor",
        "spruce_trapdoor",
        "birch_trapdoor",
        "jungle_trapdoor",
        "acacia_trapdoor",
        "cherry_trapdoor",
        "dark_oak_trapdoor",
        "mangrove_trapdoor",
        "bamboo_trapdoor",
        "crimson_trapdoor",
        "warped_trapdoor",
        "copper_trapdoor",
        "exposed_copper_trapdoor",
        "weathered_copper_trapdoor",
        "oxidized_copper_trapdoor",
        "waxed_copper_trapdoor",
        "waxed_exposed_copper_trapdoor",
        "waxed_weathered_copper_trapdoor",
        "waxed_oxidized_copper_trapdoor",
        "oak_fence_gate",
        "spruce_fence_gate",
        "birch_fence_gate",
        "jungle_fence_gate",
        "acacia_fence_gate",
        "cherry_fence_gate",
        "dark_oak_fence_gate",
        "mangrove_fence_gate",
        "bamboo_fence_gate",
        "crimson_fence_gate",
        "warped_fence_gate",
        "structure_block",
        "jigsaw",
        "oak_sign",
        "spruce_sign",
        "birch_sign",
        "jungle_sign",
        "acacia_sign",
        "cherry_sign",
        "dark_oak_sign",
        "mangrove_sign",
        "bamboo_sign",
        "crimson_sign",
        "warped_sign",
        "oak_hanging_sign",
        "spruce_hanging_sign",
        "birch_hanging_sign",
        "jungle_hanging_sign",
        "acacia_hanging_sign",
        "cherry_hanging_sign",
        "dark_oak_hanging_sign",
        "mangrove_hanging_sign",
        "bamboo_hanging_sign",
        "crimson_hanging_sign",
        "warped_hanging_sign",
        "dried_kelp_block",
        "cake",
        "white_bed",
        "orange_bed",
        "magenta_bed",
        "light_blue_bed",
        "yellow_bed",
        "lime_bed",
        "pink_bed",
        "gray_bed",
        "light_gray_bed",
        "cyan_bed",
        "purple_bed",
        "blue_bed",
        "brown_bed",
        "green_bed",
        "red_bed",
        "black_bed",
        "crafter",
        "brewing_stand",
        "cauldron",
        "white_banner",
        "orange_banner",
        "magenta_banner",
        "light_blue_banner",
        "yellow_banner",
        "lime_banner",
        "pink_banner",
        "gray_banner",
        "light_gray_banner",
        "cyan_banner",
        "purple_banner",
        "blue_banner",
        "brown_banner",
        "green_banner",
        "red_banner",
        "black_banner",
        "loom",
        "composter",
        "barrel",
        "smoker",
        "blast_furnace",
        "cartography_table",
        "fletching_table",
        "grindstone",
        "smithing_table",
        "stonecutter",
        "bell",
        "lantern",
        "soul_lantern",
        "campfire",
        "soul_campfire",
        "shroomlight",
        "bee_nest",
        "beehive",
        "honeycomb_block",
        "lodestone",
        "crying_obsidian",
        "blackstone",
        "blackstone_slab",
        "blackstone_stairs",
        "gilded_blackstone",
        "polished_blackstone",
        "polished_blackstone_slab",
        "polished_blackstone_stairs",
        "chiseled_polished_blackstone",
        "polished_blackstone_bricks",
        "polished_blackstone_brick_slab",
        "polished_blackstone_brick_stairs",
        "cracked_polished_blackstone_bricks",
        "respawn_anchor",
        "small_amethyst_bud",
        "medium_amethyst_bud",
        "large_amethyst_bud",
        "amethyst_cluster",
        "pointed_dripstone",
        "ochre_froglight",
        "verdant_froglight",
        "pearlescent_froglight",
        "copper_grate",
        "exposed_copper_grate",
        "weathered_copper_grate",
        "oxidized_copper_grate",
        "waxed_copper_grate",
        "waxed_exposed_copper_grate",
        "waxed_weathered_copper_grate",
        "waxed_oxidized_copper_grate",
        "copper_bulb",
        "exposed_copper_bulb",
        "weathered_copper_bulb",
        "oxidized_copper_bulb",
        "waxed_copper_bulb",
        "waxed_exposed_copper_bulb",
        "waxed_weathered_copper_bulb",
        "waxed_oxidized_copper_bulb",
        "trial_spawner",
        "vault",
        "piston_head",
        "moving_piston",
        "oak_wall_sign",
        "spruce_wall_sign",
        "birch_wall_sign",
        "acacia_wall_sign",
        "cherry_wall_sign",
        "jungle_wall_sign",
        "dark_oak_wall_sign",
        "mangrove_wall_sign",
        "bamboo_wall_sign",
        "oak_wall_hanging_sign",
        "spruce_wall_hanging_sign",
        "birch_wall_hanging_sign",
        "acacia_wall_hanging_sign",
        "cherry_wall_hanging_sign",
        "jungle_wall_hanging_sign",
        "dark_oak_wall_hanging_sign",
        "mangrove_wall_hanging_sign",
        "crimson_wall_hanging_sign",
        "warped_wall_hanging_sign",
        "bamboo_wall_hanging_sign",
        "water_cauldron",
        "lava_cauldron",
        "powder_snow_cauldron",
        "white_wall_banner",
        "orange_wall_banner",
        "magenta_wall_banner",
        "light_blue_wall_banner",
        "yellow_wall_banner",
        "lime_wall_banner",
        "pink_wall_banner",
        "gray_wall_banner",
        "light_gray_wall_banner",
        "cyan_wall_banner",
        "purple_wall_banner",
        "blue_wall_banner",
        "brown_wall_banner",
        "green_wall_banner",
        "red_wall_banner",
        "black_wall_banner",
        "frosted_ice",
        "dead_tube_coral_wall_fan",
        "dead_brain_coral_wall_fan",
        "dead_bubble_coral_wall_fan",
        "dead_fire_coral_wall_fan",
        "dead_horn_coral_wall_fan",
        "crimson_wall_sign",
        "warped_wall_sign",
        "candle_cake",
        "white_candle_cake",
        "orange_candle_cake",
        "magenta_candle_cake",
        "light_blue_candle_cake",
        "yellow_candle_cake",
        "lime_candle_cake",
        "pink_candle_cake",
        "gray_candle_cake",
        "light_gray_candle_cake",
        "cyan_candle_cake",
        "purple_candle_cake",
        "blue_candle_cake",
        "brown_candle_cake",
        "green_candle_cake",
        "red_candle_cake",
        "black_candle_cake"
    ],
    "records": [
        "music_disc_13",
        "music_disc_cat",
        "music_disc_blocks",
        "music_disc_chirp",
        "music_disc_creator",
        "music_disc_creator_music_box",
        "music_disc_far",
        "music_disc_mall",
        "music_disc_mellohi",
        "music_disc_stal",
        "music_disc_strad",
        "music_disc_ward",
        "music_disc_11",
        "music_disc_wait",
        "music_disc_otherside",
        "music_disc_relic",
        "music_disc_5",
        "music_disc_pigstep",
        "music_disc_precipice"
    ],
    "enchantables": [
        "carved_pumpkin",
        "carrot_on_a_stick",
        "warped_fungus_on_a_stick",
        "elytra",
        "turtle_helmet",
        "wolf_armor",
        "flint_and_steel",
        "bow",
        "wooden_sword",
        "wooden_shovel",
        "wooden_pickaxe",
        "wooden_axe",
        "wooden_hoe",
        "stone_sword",
        "stone_shovel",
        "stone_pickaxe",
        "stone_axe",
        "stone_hoe",
        "golden_sword",
        "golden_shovel",
        "golden_pickaxe",
        "golden_axe",
        "golden_hoe",
        "iron_sword",
        "iron_shovel",
        "iron_pickaxe",
        "iron_axe",
        "iron_hoe",
        "diamond_sword",
        "diamond_shovel",
        "diamond_pickaxe",
        "diamond_axe",
        "diamond_hoe",
        "netherite_sword",
        "netherite_shovel",
        "netherite_pickaxe",
        "netherite_axe",
        "netherite_hoe",
        "leather_helmet",
        "leather_chestplate",
        "leather_leggings",
        "leather_boots",
        "chainmail_helmet",
        "chainmail_chestplate",
        "chainmail_leggings",
        "chainmail_boots",
        "iron_helmet",
        "iron_chestplate",
        "iron_leggings",
        "iron_boots",
        "diamond_helmet",
        "diamond_chestplate",
        "diamond_leggings",
        "diamond_boots",
        "golden_helmet",
        "golden_chestplate",
        "golden_leggings",
        "golden_boots",
        "netherite_helmet",
        "netherite_chestplate",
        "netherite_leggings",
        "netherite_boots",
        "compass",
        "fishing_rod",
        "shears",
        "mace",
        "skeleton_skull",
        "wither_skeleton_skull",
        "player_head",
        "zombie_head",
        "creeper_head",
        "dragon_head",
        "piglin_head",
        "shield",
        "trident",
        "crossbow",
        "brush"
    ],
    "burnableBlocks": [
        "oak_planks",
        "spruce_planks",
        "birch_planks",
        "jungle_planks",
        "acacia_planks",
        "cherry_planks",
        "dark_oak_planks",
        "mangrove_planks",
        "bamboo_planks",
        "bamboo_mosaic",
        "coal_block",
        "oak_log",
        "spruce_log",
        "birch_log",
        "jungle_log",
        "acacia_log",
        "cherry_log",
        "dark_oak_log",
        "mangrove_log",
        "mangrove_roots",
        "bamboo_block",
        "stripped_oak_log",
        "stripped_spruce_log",
        "stripped_birch_log",
        "stripped_jungle_log",
        "stripped_acacia_log",
        "stripped_cherry_log",
        "stripped_dark_oak_log",
        "stripped_mangrove_log",
        "stripped_oak_wood",
        "stripped_spruce_wood",
        "stripped_birch_wood",
        "stripped_jungle_wood",
        "stripped_acacia_wood",
        "stripped_cherry_wood",
        "stripped_dark_oak_wood",
        "stripped_mangrove_wood",
        "stripped_bamboo_block",
        "oak_wood",
        "spruce_wood",
        "birch_wood",
        "jungle_wood",
        "acacia_wood",
        "cherry_wood",
        "dark_oak_wood",
        "mangrove_wood",
        "oak_leaves",
        "spruce_leaves",
        "birch_leaves",
        "jungle_leaves",
        "acacia_leaves",
        "cherry_leaves",
        "dark_oak_leaves",
        "mangrove_leaves",
        "azalea_leaves",
        "flowering_azalea_leaves",
        "short_grass",
        "fern",
        "azalea",
        "flowering_azalea",
        "dead_bush",
        "white_wool",
        "orange_wool",
        "magenta_wool",
        "light_blue_wool",
        "yellow_wool",
        "lime_wool",
        "pink_wool",
        "gray_wool",
        "light_gray_wool",
        "cyan_wool",
        "purple_wool",
        "blue_wool",
        "brown_wool",
        "green_wool",
        "red_wool",
        "black_wool",
        "dandelion",
        "poppy",
        "blue_orchid",
        "allium",
        "azure_bluet",
        "red_tulip",
        "orange_tulip",
        "white_tulip",
        "pink_tulip",
        "oxeye_daisy",
        "cornflower",
        "lily_of_the_valley",
        "wither_rose",
        "torchflower",
        "pitcher_plant",
        "spore_blossom",
        "pink_petals",
        "hanging_roots",
        "big_dripleaf",
        "small_dripleaf",
        "bamboo",
        "oak_slab",
        "spruce_slab",
        "birch_slab",
        "jungle_slab",
        "acacia_slab",
        "cherry_slab",
        "dark_oak_slab",
        "mangrove_slab",
        "bamboo_slab",
        "bamboo_mosaic_slab",
        "bookshelf",
        "oak_fence",
        "spruce_fence",
        "birch_fence",
        "jungle_fence",
        "acacia_fence",
        "cherry_fence",
        "dark_oak_fence",
        "mangrove_fence",
        "bamboo_fence",
        "vine",
        "glow_lichen",
        "oak_stairs",
        "spruce_stairs",
        "birch_stairs",
        "jungle_stairs",
        "acacia_stairs",
        "cherry_stairs",
        "dark_oak_stairs",
        "mangrove_stairs",
        "bamboo_stairs",
        "bamboo_mosaic_stairs",
        "hay_block",
        "white_carpet",
        "orange_carpet",
        "magenta_carpet",
        "light_blue_carpet",
        "yellow_carpet",
        "lime_carpet",
        "pink_carpet",
        "gray_carpet",
        "light_gray_carpet",
        "cyan_carpet",
        "purple_carpet",
        "blue_carpet",
        "brown_carpet",
        "green_carpet",
        "red_carpet",
        "black_carpet",
        "sunflower",
        "lilac",
        "rose_bush",
        "peony",
        "tall_grass",
        "large_fern",
        "scaffolding",
        "lectern",
        "target",
        "tnt",
        "oak_fence_gate",
        "spruce_fence_gate",
        "birch_fence_gate",
        "jungle_fence_gate",
        "acacia_fence_gate",
        "cherry_fence_gate",
        "dark_oak_fence_gate",
        "mangrove_fence_gate",
        "bamboo_fence_gate",
        "dried_kelp_block",
        "composter",
        "bee_nest",
        "beehive",
        "sweet_berry_bush",
        "cave_vines",
        "cave_vines_plant",
        "big_dripleaf_stem"
    ],
    "fuels": [
        "oak_planks",
        "spruce_planks",
        "birch_planks",
        "jungle_planks",
        "acacia_planks",
        "cherry_planks",
        "dark_oak_planks",
        "mangrove_planks",
        "bamboo_planks",
        "bamboo_mosaic",
        "oak_sapling",
        "spruce_sapling",
        "birch_sapling",
        "jungle_sapling",
        "acacia_sapling",
        "cherry_sapling",
        "dark_oak_sapling",
        "mangrove_propagule",
        "coal_block",
        "oak_log",
        "spruce_log",
        "birch_log",
        "jungle_log",
        "acacia_log",
        "cherry_log",
        "dark_oak_log",
        "mangrove_log",
        "mangrove_roots",
        "bamboo_block",
        "stripped_oak_log",
        "stripped_spruce_log",
        "stripped_birch_log",
        "stripped_jungle_log",
        "stripped_acacia_log",
        "stripped_cherry_log",
        "stripped_dark_oak_log",
        "stripped_mangrove_log",
        "stripped_oak_wood",
        "stripped_spruce_wood",
        "stripped_birch_wood",
        "stripped_jungle_wood",
        "stripped_acacia_wood",
        "stripped_cherry_wood",
        "stripped_dark_oak_wood",
        "stripped_mangrove_wood",
        "stripped_bamboo_block",
        "oak_wood",
        "spruce_wood",
        "birch_wood",
        "jungle_wood",
        "acacia_wood",
        "cherry_wood",
        "dark_oak_wood",
        "mangrove_wood",
        "azalea",
        "flowering_azalea",
        "dead_bush",
        "white_wool",
        "orange_wool",
        "magenta_wool",
        "light_blue_wool",
        "yellow_wool",
        "lime_wool",
        "pink_wool",
        "gray_wool",
        "light_gray_wool",
        "cyan_wool",
        "purple_wool",
        "blue_wool",
        "brown_wool",
        "green_wool",
        "red_wool",
        "black_wool",
        "bamboo",
        "oak_slab",
        "spruce_slab",
        "birch_slab",
        "jungle_slab",
        "acacia_slab",
        "cherry_slab",
        "dark_oak_slab",
        "mangrove_slab",
        "bamboo_slab",
        "bamboo_mosaic_slab",
        "bookshelf",
        "chiseled_bookshelf",
        "chest",
        "crafting_table",
        "ladder",
        "jukebox",
        "oak_fence",
        "spruce_fence",
        "birch_fence",
        "jungle_fence",
        "acacia_fence",
        "cherry_fence",
        "dark_oak_fence",
        "mangrove_fence",
        "bamboo_fence",
        "oak_stairs",
        "spruce_stairs",
        "birch_stairs",
        "jungle_stairs",
        "acacia_stairs",
        "cherry_stairs",
        "dark_oak_stairs",
        "mangrove_stairs",
        "bamboo_stairs",
        "bamboo_mosaic_stairs",
        "white_carpet",
        "orange_carpet",
        "magenta_carpet",
        "light_blue_carpet",
        "yellow_carpet",
        "lime_carpet",
        "pink_carpet",
        "gray_carpet",
        "light_gray_carpet",
        "cyan_carpet",
        "purple_carpet",
        "blue_carpet",
        "brown_carpet",
        "green_carpet",
        "red_carpet",
        "black_carpet",
        "scaffolding",
        "lectern",
        "daylight_detector",
        "trapped_chest",
        "note_block",
        "oak_button",
        "spruce_button",
        "birch_button",
        "jungle_button",
        "acacia_button",
        "cherry_button",
        "dark_oak_button",
        "mangrove_button",
        "bamboo_button",
        "oak_pressure_plate",
        "spruce_pressure_plate",
        "birch_pressure_plate",
        "jungle_pressure_plate",
        "acacia_pressure_plate",
        "cherry_pressure_plate",
        "dark_oak_pressure_plate",
        "mangrove_pressure_plate",
        "bamboo_pressure_plate",
        "oak_door",
        "spruce_door",
        "birch_door",
        "jungle_door",
        "acacia_door",
        "cherry_door",
        "dark_oak_door",
        "mangrove_door",
        "bamboo_door",
        "oak_trapdoor",
        "spruce_trapdoor",
        "birch_trapdoor",
        "jungle_trapdoor",
        "acacia_trapdoor",
        "cherry_trapdoor",
        "dark_oak_trapdoor",
        "mangrove_trapdoor",
        "bamboo_trapdoor",
        "oak_fence_gate",
        "spruce_fence_gate",
        "birch_fence_gate",
        "jungle_fence_gate",
        "acacia_fence_gate",
        "cherry_fence_gate",
        "dark_oak_fence_gate",
        "mangrove_fence_gate",
        "bamboo_fence_gate",
        "oak_boat",
        "oak_chest_boat",
        "spruce_boat",
        "spruce_chest_boat",
        "birch_boat",
        "birch_chest_boat",
        "jungle_boat",
        "jungle_chest_boat",
        "acacia_boat",
        "acacia_chest_boat",
        "cherry_boat",
        "cherry_chest_boat",
        "dark_oak_boat",
        "dark_oak_chest_boat",
        "mangrove_boat",
        "mangrove_chest_boat",
        "bamboo_raft",
        "bamboo_chest_raft",
        "bowl",
        "bow",
        "coal",
        "charcoal",
        "wooden_sword",
        "wooden_shovel",
        "wooden_pickaxe",
        "wooden_axe",
        "wooden_hoe",
        "stick",
        "oak_sign",
        "spruce_sign",
        "birch_sign",
        "jungle_sign",
        "acacia_sign",
        "cherry_sign",
        "dark_oak_sign",
        "mangrove_sign",
        "bamboo_sign",
        "oak_hanging_sign",
        "spruce_hanging_sign",
        "birch_hanging_sign",
        "jungle_hanging_sign",
        "acacia_hanging_sign",
        "cherry_hanging_sign",
        "dark_oak_hanging_sign",
        "mangrove_hanging_sign",
        "bamboo_hanging_sign",
        "lava_bucket",
        "dried_kelp_block",
        "fishing_rod",
        "blaze_rod",
        "white_banner",
        "orange_banner",
        "magenta_banner",
        "light_blue_banner",
        "yellow_banner",
        "lime_banner",
        "pink_banner",
        "gray_banner",
        "light_gray_banner",
        "cyan_banner",
        "purple_banner",
        "blue_banner",
        "brown_banner",
        "green_banner",
        "red_banner",
        "black_banner",
        "crossbow",
        "loom",
        "composter",
        "barrel",
        "cartography_table",
        "fletching_table",
        "smithing_table"
    ],
    "lightPassables": [
        "air",
        "tuff_slab",
        "tuff_stairs",
        "tuff_wall",
        "polished_tuff_slab",
        "polished_tuff_stairs",
        "polished_tuff_wall",
        "tuff_brick_slab",
        "tuff_brick_stairs",
        "tuff_brick_wall",
        "oak_sapling",
        "spruce_sapling",
        "birch_sapling",
        "jungle_sapling",
        "acacia_sapling",
        "cherry_sapling",
        "dark_oak_sapling",
        "mangrove_propagule",
        "heavy_core",
        "cut_copper_stairs",
        "exposed_cut_copper_stairs",
        "weathered_cut_copper_stairs",
        "oxidized_cut_copper_stairs",
        "cut_copper_slab",
        "exposed_cut_copper_slab",
        "weathered_cut_copper_slab",
        "oxidized_cut_copper_slab",
        "waxed_cut_copper_stairs",
        "waxed_exposed_cut_copper_stairs",
        "waxed_weathered_cut_copper_stairs",
        "waxed_oxidized_cut_copper_stairs",
        "waxed_cut_copper_slab",
        "waxed_exposed_cut_copper_slab",
        "waxed_weathered_cut_copper_slab",
        "waxed_oxidized_cut_copper_slab",
        "oak_leaves",
        "spruce_leaves",
        "birch_leaves",
        "jungle_leaves",
        "acacia_leaves",
        "cherry_leaves",
        "dark_oak_leaves",
        "mangrove_leaves",
        "azalea_leaves",
        "flowering_azalea_leaves",
        "glass",
        "tinted_glass",
        "cobweb",
        "short_grass",
        "fern",
        "azalea",
        "flowering_azalea",
        "dead_bush",
        "seagrass",
        "sea_pickle",
        "dandelion",
        "poppy",
        "blue_orchid",
        "allium",
        "azure_bluet",
        "red_tulip",
        "orange_tulip",
        "white_tulip",
        "pink_tulip",
        "oxeye_daisy",
        "cornflower",
        "lily_of_the_valley",
        "wither_rose",
        "torchflower",
        "pitcher_plant",
        "spore_blossom",
        "brown_mushroom",
        "red_mushroom",
        "crimson_fungus",
        "warped_fungus",
        "crimson_roots",
        "warped_roots",
        "nether_sprouts",
        "weeping_vines",
        "twisting_vines",
        "sugar_cane",
        "kelp",
        "moss_carpet",
        "pink_petals",
        "hanging_roots",
        "big_dripleaf",
        "small_dripleaf",
        "bamboo",
        "oak_slab",
        "spruce_slab",
        "birch_slab",
        "jungle_slab",
        "acacia_slab",
        "cherry_slab",
        "dark_oak_slab",
        "mangrove_slab",
        "bamboo_slab",
        "bamboo_mosaic_slab",
        "crimson_slab",
        "warped_slab",
        "stone_slab",
        "smooth_stone_slab",
        "sandstone_slab",
        "cut_sandstone_slab",
        "petrified_oak_slab",
        "cobblestone_slab",
        "brick_slab",
        "stone_brick_slab",
        "mud_brick_slab",
        "nether_brick_slab",
        "quartz_slab",
        "red_sandstone_slab",
        "cut_red_sandstone_slab",
        "purpur_slab",
        "prismarine_slab",
        "prismarine_brick_slab",
        "dark_prismarine_slab",
        "decorated_pot",
        "torch",
        "end_rod",
        "chorus_plant",
        "chorus_flower",
        "purpur_stairs",
        "chest",
        "farmland",
        "ladder",
        "cobblestone_stairs",
        "snow",
        "ice",
        "cactus",
        "oak_fence",
        "spruce_fence",
        "birch_fence",
        "jungle_fence",
        "acacia_fence",
        "cherry_fence",
        "dark_oak_fence",
        "mangrove_fence",
        "bamboo_fence",
        "crimson_fence",
        "warped_fence",
        "soul_torch",
        "glowstone",
        "iron_bars",
        "chain",
        "glass_pane",
        "vine",
        "glow_lichen",
        "brick_stairs",
        "stone_brick_stairs",
        "mud_brick_stairs",
        "lily_pad",
        "nether_brick_fence",
        "nether_brick_stairs",
        "sculk_vein",
        "sculk_shrieker",
        "enchanting_table",
        "end_portal_frame",
        "dragon_egg",
        "sandstone_stairs",
        "ender_chest",
        "oak_stairs",
        "spruce_stairs",
        "birch_stairs",
        "jungle_stairs",
        "acacia_stairs",
        "cherry_stairs",
        "dark_oak_stairs",
        "mangrove_stairs",
        "bamboo_stairs",
        "bamboo_mosaic_stairs",
        "crimson_stairs",
        "warped_stairs",
        "beacon",
        "cobblestone_wall",
        "mossy_cobblestone_wall",
        "brick_wall",
        "prismarine_wall",
        "red_sandstone_wall",
        "mossy_stone_brick_wall",
        "granite_wall",
        "stone_brick_wall",
        "mud_brick_wall",
        "nether_brick_wall",
        "andesite_wall",
        "red_nether_brick_wall",
        "sandstone_wall",
        "end_stone_brick_wall",
        "diorite_wall",
        "blackstone_wall",
        "polished_blackstone_wall",
        "polished_blackstone_brick_wall",
        "cobbled_deepslate_wall",
        "polished_deepslate_wall",
        "deepslate_brick_wall",
        "deepslate_tile_wall",
        "anvil",
        "chipped_anvil",
        "damaged_anvil",
        "quartz_stairs",
        "light",
        "white_carpet",
        "orange_carpet",
        "magenta_carpet",
        "light_blue_carpet",
        "yellow_carpet",
        "lime_carpet",
        "pink_carpet",
        "gray_carpet",
        "light_gray_carpet",
        "cyan_carpet",
        "purple_carpet",
        "blue_carpet",
        "brown_carpet",
        "green_carpet",
        "red_carpet",
        "black_carpet",
        "dirt_path",
        "sunflower",
        "lilac",
        "rose_bush",
        "peony",
        "tall_grass",
        "large_fern",
        "white_stained_glass",
        "orange_stained_glass",
        "magenta_stained_glass",
        "light_blue_stained_glass",
        "yellow_stained_glass",
        "lime_stained_glass",
        "pink_stained_glass",
        "gray_stained_glass",
        "light_gray_stained_glass",
        "cyan_stained_glass",
        "purple_stained_glass",
        "blue_stained_glass",
        "brown_stained_glass",
        "green_stained_glass",
        "red_stained_glass",
        "black_stained_glass",
        "white_stained_glass_pane",
        "orange_stained_glass_pane",
        "magenta_stained_glass_pane",
        "light_blue_stained_glass_pane",
        "yellow_stained_glass_pane",
        "lime_stained_glass_pane",
        "pink_stained_glass_pane",
        "gray_stained_glass_pane",
        "light_gray_stained_glass_pane",
        "cyan_stained_glass_pane",
        "purple_stained_glass_pane",
        "blue_stained_glass_pane",
        "brown_stained_glass_pane",
        "green_stained_glass_pane",
        "red_stained_glass_pane",
        "black_stained_glass_pane",
        "prismarine_stairs",
        "prismarine_brick_stairs",
        "dark_prismarine_stairs",
        "sea_lantern",
        "red_sandstone_stairs",
        "structure_void",
        "turtle_egg",
        "sniffer_egg",
        "tube_coral",
        "brain_coral",
        "bubble_coral",
        "fire_coral",
        "horn_coral",
        "dead_brain_coral",
        "dead_bubble_coral",
        "dead_fire_coral",
        "dead_horn_coral",
        "dead_tube_coral",
        "tube_coral_fan",
        "brain_coral_fan",
        "bubble_coral_fan",
        "fire_coral_fan",
        "horn_coral_fan",
        "dead_tube_coral_fan",
        "dead_brain_coral_fan",
        "dead_bubble_coral_fan",
        "dead_fire_coral_fan",
        "dead_horn_coral_fan",
        "conduit",
        "polished_granite_stairs",
        "smooth_red_sandstone_stairs",
        "mossy_stone_brick_stairs",
        "polished_diorite_stairs",
        "mossy_cobblestone_stairs",
        "end_stone_brick_stairs",
        "stone_stairs",
        "smooth_sandstone_stairs",
        "smooth_quartz_stairs",
        "granite_stairs",
        "andesite_stairs",
        "red_nether_brick_stairs",
        "polished_andesite_stairs",
        "diorite_stairs",
        "cobbled_deepslate_stairs",
        "polished_deepslate_stairs",
        "deepslate_brick_stairs",
        "deepslate_tile_stairs",
        "polished_granite_slab",
        "smooth_red_sandstone_slab",
        "mossy_stone_brick_slab",
        "polished_diorite_slab",
        "mossy_cobblestone_slab",
        "end_stone_brick_slab",
        "smooth_sandstone_slab",
        "smooth_quartz_slab",
        "granite_slab",
        "andesite_slab",
        "red_nether_brick_slab",
        "polished_andesite_slab",
        "diorite_slab",
        "cobbled_deepslate_slab",
        "polished_deepslate_slab",
        "deepslate_brick_slab",
        "deepslate_tile_slab",
        "scaffolding",
        "redstone_torch",
        "redstone_block",
        "repeater",
        "comparator",
        "piston",
        "sticky_piston",
        "honey_block",
        "observer",
        "hopper",
        "lectern",
        "lever",
        "lightning_rod",
        "daylight_detector",
        "sculk_sensor",
        "calibrated_sculk_sensor",
        "tripwire_hook",
        "trapped_chest",
        "tnt",
        "stone_button",
        "polished_blackstone_button",
        "oak_button",
        "spruce_button",
        "birch_button",
        "jungle_button",
        "acacia_button",
        "cherry_button",
        "dark_oak_button",
        "mangrove_button",
        "bamboo_button",
        "crimson_button",
        "warped_button",
        "stone_pressure_plate",
        "polished_blackstone_pressure_plate",
        "light_weighted_pressure_plate",
        "heavy_weighted_pressure_plate",
        "oak_pressure_plate",
        "spruce_pressure_plate",
        "birch_pressure_plate",
        "jungle_pressure_plate",
        "acacia_pressure_plate",
        "cherry_pressure_plate",
        "dark_oak_pressure_plate",
        "mangrove_pressure_plate",
        "bamboo_pressure_plate",
        "crimson_pressure_plate",
        "warped_pressure_plate",
        "iron_door",
        "oak_door",
        "spruce_door",
        "birch_door",
        "jungle_door",
        "acacia_door",
        "cherry_door",
        "dark_oak_door",
        "mangrove_door",
        "bamboo_door",
        "crimson_door",
        "warped_door",
        "copper_door",
        "exposed_copper_door",
        "weathered_copper_door",
        "oxidized_copper_door",
        "waxed_copper_door",
        "waxed_exposed_copper_door",
        "waxed_weathered_copper_door",
        "waxed_oxidized_copper_door",
        "iron_trapdoor",
        "oak_trapdoor",
        "spruce_trapdoor",
        "birch_trapdoor",
        "jungle_trapdoor",
        "acacia_trapdoor",
        "cherry_trapdoor",
        "dark_oak_trapdoor",
        "mangrove_trapdoor",
        "bamboo_trapdoor",
        "crimson_trapdoor",
        "warped_trapdoor",
        "copper_trapdoor",
        "exposed_copper_trapdoor",
        "weathered_copper_trapdoor",
        "oxidized_copper_trapdoor",
        "waxed_copper_trapdoor",
        "waxed_exposed_copper_trapdoor",
        "waxed_weathered_copper_trapdoor",
        "waxed_oxidized_copper_trapdoor",
        "oak_fence_gate",
        "spruce_fence_gate",
        "birch_fence_gate",
        "jungle_fence_gate",
        "acacia_fence_gate",
        "cherry_fence_gate",
        "dark_oak_fence_gate",
        "mangrove_fence_gate",
        "bamboo_fence_gate",
        "crimson_fence_gate",
        "warped_fence_gate",
        "powered_rail",
        "detector_rail",
        "rail",
        "activator_rail",
        "wheat",
        "oak_sign",
        "spruce_sign",
        "birch_sign",
        "jungle_sign",
        "acacia_sign",
        "cherry_sign",
        "dark_oak_sign",
        "mangrove_sign",
        "bamboo_sign",
        "crimson_sign",
        "warped_sign",
        "oak_hanging_sign",
        "spruce_hanging_sign",
        "birch_hanging_sign",
        "jungle_hanging_sign",
        "acacia_hanging_sign",
        "cherry_hanging_sign",
        "dark_oak_hanging_sign",
        "mangrove_hanging_sign",
        "bamboo_hanging_sign",
        "crimson_hanging_sign",
        "warped_hanging_sign",
        "cake",
        "white_bed",
        "orange_bed",
        "magenta_bed",
        "light_blue_bed",
        "yellow_bed",
        "lime_bed",
        "pink_bed",
        "gray_bed",
        "light_gray_bed",
        "cyan_bed",
        "purple_bed",
        "blue_bed",
        "brown_bed",
        "green_bed",
        "red_bed",
        "black_bed",
        "nether_wart",
        "brewing_stand",
        "cauldron",
        "flower_pot",
        "skeleton_skull",
        "wither_skeleton_skull",
        "player_head",
        "zombie_head",
        "creeper_head",
        "dragon_head",
        "piglin_head",
        "white_banner",
        "orange_banner",
        "magenta_banner",
        "light_blue_banner",
        "yellow_banner",
        "lime_banner",
        "pink_banner",
        "gray_banner",
        "light_gray_banner",
        "cyan_banner",
        "purple_banner",
        "blue_banner",
        "brown_banner",
        "green_banner",
        "red_banner",
        "black_banner",
        "composter",
        "grindstone",
        "stonecutter",
        "bell",
        "lantern",
        "soul_lantern",
        "campfire",
        "soul_campfire",
        "blackstone_slab",
        "blackstone_stairs",
        "polished_blackstone_slab",
        "polished_blackstone_stairs",
        "polished_blackstone_brick_slab",
        "polished_blackstone_brick_stairs",
        "candle",
        "white_candle",
        "orange_candle",
        "magenta_candle",
        "light_blue_candle",
        "yellow_candle",
        "lime_candle",
        "pink_candle",
        "gray_candle",
        "light_gray_candle",
        "cyan_candle",
        "purple_candle",
        "blue_candle",
        "brown_candle",
        "green_candle",
        "red_candle",
        "black_candle",
        "small_amethyst_bud",
        "medium_amethyst_bud",
        "large_amethyst_bud",
        "amethyst_cluster",
        "pointed_dripstone",
        "frogspawn",
        "copper_grate",
        "exposed_copper_grate",
        "weathered_copper_grate",
        "oxidized_copper_grate",
        "waxed_copper_grate",
        "waxed_exposed_copper_grate",
        "waxed_weathered_copper_grate",
        "waxed_oxidized_copper_grate",
        "copper_bulb",
        "exposed_copper_bulb",
        "weathered_copper_bulb",
        "oxidized_copper_bulb",
        "waxed_copper_bulb",
        "waxed_exposed_copper_bulb",
        "waxed_weathered_copper_bulb",
        "waxed_oxidized_copper_bulb",
        "water",
        "lava",
        "tall_seagrass",
        "piston_head",
        "moving_piston",
        "wall_torch",
        "fire",
        "soul_fire",
        "redstone_wire",
        "oak_wall_sign",
        "spruce_wall_sign",
        "birch_wall_sign",
        "acacia_wall_sign",
        "cherry_wall_sign",
        "jungle_wall_sign",
        "dark_oak_wall_sign",
        "mangrove_wall_sign",
        "bamboo_wall_sign",
        "oak_wall_hanging_sign",
        "spruce_wall_hanging_sign",
        "birch_wall_hanging_sign",
        "acacia_wall_hanging_sign",
        "cherry_wall_hanging_sign",
        "jungle_wall_hanging_sign",
        "dark_oak_wall_hanging_sign",
        "mangrove_wall_hanging_sign",
        "crimson_wall_hanging_sign",
        "warped_wall_hanging_sign",
        "bamboo_wall_hanging_sign",
        "redstone_wall_torch",
        "soul_wall_torch",
        "nether_portal",
        "attached_pumpkin_stem",
        "attached_melon_stem",
        "pumpkin_stem",
        "melon_stem",
        "water_cauldron",
        "lava_cauldron",
        "powder_snow_cauldron",
        "end_portal",
        "cocoa",
        "tripwire",
        "potted_torchflower",
        "potted_oak_sapling",
        "potted_spruce_sapling",
        "potted_birch_sapling",
        "potted_jungle_sapling",
        "potted_acacia_sapling",
        "potted_cherry_sapling",
        "potted_dark_oak_sapling",
        "potted_mangrove_propagule",
        "potted_fern",
        "potted_dandelion",
        "potted_poppy",
        "potted_blue_orchid",
        "potted_allium",
        "potted_azure_bluet",
        "potted_red_tulip",
        "potted_orange_tulip",
        "potted_white_tulip",
        "potted_pink_tulip",
        "potted_oxeye_daisy",
        "potted_cornflower",
        "potted_lily_of_the_valley",
        "potted_wither_rose",
        "potted_red_mushroom",
        "potted_brown_mushroom",
        "potted_dead_bush",
        "potted_cactus",
        "carrots",
        "potatoes",
        "skeleton_wall_skull",
        "wither_skeleton_wall_skull",
        "zombie_wall_head",
        "player_wall_head",
        "creeper_wall_head",
        "dragon_wall_head",
        "piglin_wall_head",
        "white_wall_banner",
        "orange_wall_banner",
        "magenta_wall_banner",
        "light_blue_wall_banner",
        "yellow_wall_banner",
        "lime_wall_banner",
        "pink_wall_banner",
        "gray_wall_banner",
        "light_gray_wall_banner",
        "cyan_wall_banner",
        "purple_wall_banner",
        "blue_wall_banner",
        "brown_wall_banner",
        "green_wall_banner",
        "red_wall_banner",
        "black_wall_banner",
        "torchflower_crop",
        "pitcher_crop",
        "beetroots",
        "end_gateway",
        "frosted_ice",
        "kelp_plant",
        "dead_tube_coral_wall_fan",
        "dead_brain_coral_wall_fan",
        "dead_bubble_coral_wall_fan",
        "dead_fire_coral_wall_fan",
        "dead_horn_coral_wall_fan",
        "tube_coral_wall_fan",
        "brain_coral_wall_fan",
        "bubble_coral_wall_fan",
        "fire_coral_wall_fan",
        "horn_coral_wall_fan",
        "bamboo_sapling",
        "potted_bamboo",
        "void_air",
        "cave_air",
        "bubble_column",
        "sweet_berry_bush",
        "weeping_vines_plant",
        "twisting_vines_plant",
        "crimson_wall_sign",
        "warped_wall_sign",
        "potted_crimson_fungus",
        "potted_warped_fungus",
        "potted_crimson_roots",
        "potted_warped_roots",
        "candle_cake",
        "white_candle_cake",
        "orange_candle_cake",
        "magenta_candle_cake",
        "light_blue_candle_cake",
        "yellow_candle_cake",
        "lime_candle_cake",
        "pink_candle_cake",
        "gray_candle_cake",
        "light_gray_candle_cake",
        "cyan_candle_cake",
        "purple_candle_cake",
        "blue_candle_cake",
        "brown_candle_cake",
        "green_candle_cake",
        "red_candle_cake",
        "black_candle_cake",
        "powder_snow",
        "cave_vines",
        "cave_vines_plant",
        "big_dripleaf_stem",
        "potted_azalea_bush",
        "potted_flowering_azalea_bush"
    ],
    "mineable.axe": [
        "oak_planks",
        "spruce_planks",
        "birch_planks",
        "jungle_planks",
        "acacia_planks",
        "cherry_planks",
        "dark_oak_planks",
        "mangrove_planks",
        "bamboo_planks",
        "crimson_planks",
        "warped_planks",
        "bamboo_mosaic",
        "oak_sapling",
        "spruce_sapling",
        "birch_sapling",
        "jungle_sapling",
        "acacia_sapling",
        "cherry_sapling",
        "dark_oak_sapling",
        "mangrove_propagule",
        "oak_log",
        "spruce_log",
        "birch_log",
        "jungle_log",
        "acacia_log",
        "cherry_log",
        "dark_oak_log",
        "mangrove_log",
        "mangrove_roots",
        "crimson_stem",
        "warped_stem",
        "bamboo_block",
        "stripped_oak_log",
        "stripped_spruce_log",
        "stripped_birch_log",
        "stripped_jungle_log",
        "stripped_acacia_log",
        "stripped_cherry_log",
        "stripped_dark_oak_log",
        "stripped_mangrove_log",
        "stripped_crimson_stem",
        "stripped_warped_stem",
        "stripped_oak_wood",
        "stripped_spruce_wood",
        "stripped_birch_wood",
        "stripped_jungle_wood",
        "stripped_acacia_wood",
        "stripped_cherry_wood",
        "stripped_dark_oak_wood",
        "stripped_mangrove_wood",
        "stripped_crimson_hyphae",
        "stripped_warped_hyphae",
        "stripped_bamboo_block",
        "oak_wood",
        "spruce_wood",
        "birch_wood",
        "jungle_wood",
        "acacia_wood",
        "cherry_wood",
        "dark_oak_wood",
        "mangrove_wood",
        "crimson_hyphae",
        "warped_hyphae",
        "short_grass",
        "fern",
        "azalea",
        "flowering_azalea",
        "dead_bush",
        "spore_blossom",
        "brown_mushroom",
        "red_mushroom",
        "crimson_fungus",
        "warped_fungus",
        "weeping_vines",
        "twisting_vines",
        "sugar_cane",
        "hanging_roots",
        "big_dripleaf",
        "small_dripleaf",
        "bamboo",
        "oak_slab",
        "spruce_slab",
        "birch_slab",
        "jungle_slab",
        "acacia_slab",
        "cherry_slab",
        "dark_oak_slab",
        "mangrove_slab",
        "bamboo_slab",
        "bamboo_mosaic_slab",
        "crimson_slab",
        "warped_slab",
        "bookshelf",
        "chiseled_bookshelf",
        "chorus_plant",
        "chorus_flower",
        "chest",
        "crafting_table",
        "ladder",
        "jukebox",
        "oak_fence",
        "spruce_fence",
        "birch_fence",
        "jungle_fence",
        "acacia_fence",
        "cherry_fence",
        "dark_oak_fence",
        "mangrove_fence",
        "bamboo_fence",
        "crimson_fence",
        "warped_fence",
        "pumpkin",
        "carved_pumpkin",
        "jack_o_lantern",
        "brown_mushroom_block",
        "red_mushroom_block",
        "mushroom_stem",
        "melon",
        "vine",
        "glow_lichen",
        "lily_pad",
        "oak_stairs",
        "spruce_stairs",
        "birch_stairs",
        "jungle_stairs",
        "acacia_stairs",
        "cherry_stairs",
        "dark_oak_stairs",
        "mangrove_stairs",
        "bamboo_stairs",
        "bamboo_mosaic_stairs",
        "crimson_stairs",
        "warped_stairs",
        "tall_grass",
        "large_fern",
        "scaffolding",
        "lectern",
        "daylight_detector",
        "trapped_chest",
        "note_block",
        "oak_button",
        "spruce_button",
        "birch_button",
        "jungle_button",
        "acacia_button",
        "cherry_button",
        "dark_oak_button",
        "mangrove_button",
        "bamboo_button",
        "crimson_button",
        "warped_button",
        "oak_pressure_plate",
        "spruce_pressure_plate",
        "birch_pressure_plate",
        "jungle_pressure_plate",
        "acacia_pressure_plate",
        "cherry_pressure_plate",
        "dark_oak_pressure_plate",
        "mangrove_pressure_plate",
        "bamboo_pressure_plate",
        "crimson_pressure_plate",
        "warped_pressure_plate",
        "oak_door",
        "spruce_door",
        "birch_door",
        "jungle_door",
        "acacia_door",
        "cherry_door",
        "dark_oak_door",
        "mangrove_door",
        "bamboo_door",
        "crimson_door",
        "warped_door",
        "oak_trapdoor",
        "spruce_trapdoor",
        "birch_trapdoor",
        "jungle_trapdoor",
        "acacia_trapdoor",
        "cherry_trapdoor",
        "dark_oak_trapdoor",
        "mangrove_trapdoor",
        "bamboo_trapdoor",
        "crimson_trapdoor",
        "warped_trapdoor",
        "oak_fence_gate",
        "spruce_fence_gate",
        "birch_fence_gate",
        "jungle_fence_gate",
        "acacia_fence_gate",
        "cherry_fence_gate",
        "dark_oak_fence_gate",
        "mangrove_fence_gate",
        "bamboo_fence_gate",
        "crimson_fence_gate",
        "warped_fence_gate",
        "wheat",
        "oak_sign",
        "spruce_sign",
        "birch_sign",
        "jungle_sign",
        "acacia_sign",
        "cherry_sign",
        "dark_oak_sign",
        "mangrove_sign",
        "bamboo_sign",
        "crimson_sign",
        "warped_sign",
        "oak_hanging_sign",
        "spruce_hanging_sign",
        "birch_hanging_sign",
        "jungle_hanging_sign",
        "acacia_hanging_sign",
        "cherry_hanging_sign",
        "dark_oak_hanging_sign",
        "mangrove_hanging_sign",
        "bamboo_hanging_sign",
        "crimson_hanging_sign",
        "warped_hanging_sign",
        "nether_wart",
        "white_banner",
        "orange_banner",
        "magenta_banner",
        "light_blue_banner",
        "yellow_banner",
        "lime_banner",
        "pink_banner",
        "gray_banner",
        "light_gray_banner",
        "cyan_banner",
        "purple_banner",
        "blue_banner",
        "brown_banner",
        "green_banner",
        "red_banner",
        "black_banner",
        "loom",
        "composter",
        "barrel",
        "cartography_table",
        "fletching_table",
        "smithing_table",
        "campfire",
        "soul_campfire",
        "bee_nest",
        "beehive",
        "oak_wall_sign",
        "spruce_wall_sign",
        "birch_wall_sign",
        "acacia_wall_sign",
        "cherry_wall_sign",
        "jungle_wall_sign",
        "dark_oak_wall_sign",
        "mangrove_wall_sign",
        "bamboo_wall_sign",
        "oak_wall_hanging_sign",
        "spruce_wall_hanging_sign",
        "birch_wall_hanging_sign",
        "acacia_wall_hanging_sign",
        "cherry_wall_hanging_sign",
        "jungle_wall_hanging_sign",
        "dark_oak_wall_hanging_sign",
        "mangrove_wall_hanging_sign",
        "crimson_wall_hanging_sign",
        "warped_wall_hanging_sign",
        "bamboo_wall_hanging_sign",
        "attached_pumpkin_stem",
        "attached_melon_stem",
        "pumpkin_stem",
        "melon_stem",
        "cocoa",
        "carrots",
        "potatoes",
        "white_wall_banner",
        "orange_wall_banner",
        "magenta_wall_banner",
        "light_blue_wall_banner",
        "yellow_wall_banner",
        "lime_wall_banner",
        "pink_wall_banner",
        "gray_wall_banner",
        "light_gray_wall_banner",
        "cyan_wall_banner",
        "purple_wall_banner",
        "blue_wall_banner",
        "brown_wall_banner",
        "green_wall_banner",
        "red_wall_banner",
        "black_wall_banner",
        "beetroots",
        "sweet_berry_bush",
        "weeping_vines_plant",
        "twisting_vines_plant",
        "crimson_wall_sign",
        "warped_wall_sign",
        "cave_vines",
        "cave_vines_plant",
        "big_dripleaf_stem"
    ],
    "armors": [
        "turtle_helmet",
        "leather_helmet",
        "leather_chestplate",
        "leather_leggings",
        "leather_boots",
        "chainmail_helmet",
        "chainmail_chestplate",
        "chainmail_leggings",
        "chainmail_boots",
        "iron_helmet",
        "iron_chestplate",
        "iron_leggings",
        "iron_boots",
        "diamond_helmet",
        "diamond_chestplate",
        "diamond_leggings",
        "diamond_boots",
        "golden_helmet",
        "golden_chestplate",
        "golden_leggings",
        "golden_boots",
        "netherite_helmet",
        "netherite_chestplate",
        "netherite_leggings",
        "netherite_boots"
    ],
    "tools": [
        "wooden_shovel",
        "wooden_pickaxe",
        "wooden_axe",
        "wooden_hoe",
        "stone_shovel",
        "stone_pickaxe",
        "stone_axe",
        "stone_hoe",
        "golden_shovel",
        "golden_pickaxe",
        "golden_axe",
        "golden_hoe",
        "iron_shovel",
        "iron_pickaxe",
        "iron_axe",
        "iron_hoe",
        "diamond_shovel",
        "diamond_pickaxe",
        "diamond_axe",
        "diamond_hoe",
        "netherite_shovel",
        "netherite_pickaxe",
        "netherite_axe",
        "netherite_hoe"
    ],
    "mineable.shovel": [
        "grass_block",
        "dirt",
        "coarse_dirt",
        "podzol",
        "rooted_dirt",
        "mud",
        "sand",
        "suspicious_sand",
        "suspicious_gravel",
        "red_sand",
        "gravel",
        "muddy_mangrove_roots",
        "farmland",
        "snow",
        "snow_block",
        "clay",
        "soul_sand",
        "soul_soil",
        "mycelium",
        "dirt_path",
        "white_concrete_powder",
        "orange_concrete_powder",
        "magenta_concrete_powder",
        "light_blue_concrete_powder",
        "yellow_concrete_powder",
        "lime_concrete_powder",
        "pink_concrete_powder",
        "gray_concrete_powder",
        "light_gray_concrete_powder",
        "cyan_concrete_powder",
        "purple_concrete_powder",
        "blue_concrete_powder",
        "brown_concrete_powder",
        "green_concrete_powder",
        "red_concrete_powder",
        "black_concrete_powder"
    ],
    "planks": [
        "oak_planks",
        "spruce_planks",
        "birch_planks",
        "jungle_planks",
        "acacia_planks",
        "cherry_planks",
        "dark_oak_planks",
        "mangrove_planks",
        "bamboo_planks",
        "crimson_planks",
        "warped_planks"
    ],
    "mineable.hoe": [
        "oak_leaves",
        "spruce_leaves",
        "birch_leaves",
        "jungle_leaves",
        "acacia_leaves",
        "cherry_leaves",
        "dark_oak_leaves",
        "mangrove_leaves",
        "azalea_leaves",
        "flowering_azalea_leaves",
        "sponge",
        "wet_sponge",
        "moss_carpet",
        "pink_petals",
        "moss_block",
        "sculk",
        "sculk_vein",
        "sculk_catalyst",
        "sculk_shrieker",
        "hay_block",
        "nether_wart_block",
        "warped_wart_block",
        "target",
        "sculk_sensor",
        "calibrated_sculk_sensor",
        "dried_kelp_block",
        "shroomlight"
    ],
    "weapons": [
        "bow",
        "wooden_sword",
        "stone_sword",
        "golden_sword",
        "iron_sword",
        "diamond_sword",
        "netherite_sword",
        "mace",
        "trident",
        "crossbow"
    ],
    "mineable.pickaxe": [
        "stone",
        "granite",
        "polished_granite",
        "diorite",
        "polished_diorite",
        "andesite",
        "polished_andesite",
        "deepslate",
        "cobbled_deepslate",
        "polished_deepslate",
        "calcite",
        "tuff",
        "tuff_slab",
        "tuff_stairs",
        "tuff_wall",
        "chiseled_tuff",
        "polished_tuff",
        "polished_tuff_slab",
        "polished_tuff_stairs",
        "polished_tuff_wall",
        "tuff_bricks",
        "tuff_brick_slab",
        "tuff_brick_stairs",
        "tuff_brick_wall",
        "chiseled_tuff_bricks",
        "dripstone_block",
        "crimson_nylium",
        "warped_nylium",
        "cobblestone",
        "coal_ore",
        "deepslate_coal_ore",
        "iron_ore",
        "deepslate_iron_ore",
        "copper_ore",
        "deepslate_copper_ore",
        "gold_ore",
        "deepslate_gold_ore",
        "redstone_ore",
        "deepslate_redstone_ore",
        "emerald_ore",
        "deepslate_emerald_ore",
        "lapis_ore",
        "deepslate_lapis_ore",
        "diamond_ore",
        "deepslate_diamond_ore",
        "nether_gold_ore",
        "nether_quartz_ore",
        "ancient_debris",
        "coal_block",
        "raw_iron_block",
        "raw_copper_block",
        "raw_gold_block",
        "heavy_core",
        "amethyst_block",
        "budding_amethyst",
        "iron_block",
        "copper_block",
        "gold_block",
        "diamond_block",
        "netherite_block",
        "exposed_copper",
        "weathered_copper",
        "oxidized_copper",
        "chiseled_copper",
        "exposed_chiseled_copper",
        "weathered_chiseled_copper",
        "oxidized_chiseled_copper",
        "cut_copper",
        "exposed_cut_copper",
        "weathered_cut_copper",
        "oxidized_cut_copper",
        "cut_copper_stairs",
        "exposed_cut_copper_stairs",
        "weathered_cut_copper_stairs",
        "oxidized_cut_copper_stairs",
        "cut_copper_slab",
        "exposed_cut_copper_slab",
        "weathered_cut_copper_slab",
        "oxidized_cut_copper_slab",
        "waxed_copper_block",
        "waxed_exposed_copper",
        "waxed_weathered_copper",
        "waxed_oxidized_copper",
        "waxed_chiseled_copper",
        "waxed_exposed_chiseled_copper",
        "waxed_weathered_chiseled_copper",
        "waxed_oxidized_chiseled_copper",
        "waxed_cut_copper",
        "waxed_exposed_cut_copper",
        "waxed_weathered_cut_copper",
        "waxed_oxidized_cut_copper",
        "waxed_cut_copper_stairs",
        "waxed_exposed_cut_copper_stairs",
        "waxed_weathered_cut_copper_stairs",
        "waxed_oxidized_cut_copper_stairs",
        "waxed_cut_copper_slab",
        "waxed_exposed_cut_copper_slab",
        "waxed_weathered_cut_copper_slab",
        "waxed_oxidized_cut_copper_slab",
        "lapis_block",
        "sandstone",
        "chiseled_sandstone",
        "cut_sandstone",
        "stone_slab",
        "smooth_stone_slab",
        "sandstone_slab",
        "cut_sandstone_slab",
        "petrified_oak_slab",
        "cobblestone_slab",
        "brick_slab",
        "stone_brick_slab",
        "mud_brick_slab",
        "nether_brick_slab",
        "quartz_slab",
        "red_sandstone_slab",
        "cut_red_sandstone_slab",
        "purpur_slab",
        "prismarine_slab",
        "prismarine_brick_slab",
        "dark_prismarine_slab",
        "smooth_quartz",
        "smooth_red_sandstone",
        "smooth_sandstone",
        "smooth_stone",
        "bricks",
        "mossy_cobblestone",
        "obsidian",
        "purpur_block",
        "purpur_pillar",
        "purpur_stairs",
        "spawner",
        "furnace",
        "cobblestone_stairs",
        "ice",
        "netherrack",
        "basalt",
        "polished_basalt",
        "smooth_basalt",
        "infested_stone",
        "infested_cobblestone",
        "infested_stone_bricks",
        "infested_mossy_stone_bricks",
        "infested_cracked_stone_bricks",
        "infested_chiseled_stone_bricks",
        "infested_deepslate",
        "stone_bricks",
        "mossy_stone_bricks",
        "cracked_stone_bricks",
        "chiseled_stone_bricks",
        "packed_mud",
        "mud_bricks",
        "deepslate_bricks",
        "cracked_deepslate_bricks",
        "deepslate_tiles",
        "cracked_deepslate_tiles",
        "chiseled_deepslate",
        "iron_bars",
        "chain",
        "brick_stairs",
        "stone_brick_stairs",
        "mud_brick_stairs",
        "nether_bricks",
        "cracked_nether_bricks",
        "chiseled_nether_bricks",
        "nether_brick_fence",
        "nether_brick_stairs",
        "enchanting_table",
        "end_stone",
        "end_stone_bricks",
        "sandstone_stairs",
        "ender_chest",
        "emerald_block",
        "cobblestone_wall",
        "mossy_cobblestone_wall",
        "brick_wall",
        "prismarine_wall",
        "red_sandstone_wall",
        "mossy_stone_brick_wall",
        "granite_wall",
        "stone_brick_wall",
        "mud_brick_wall",
        "nether_brick_wall",
        "andesite_wall",
        "red_nether_brick_wall",
        "sandstone_wall",
        "end_stone_brick_wall",
        "diorite_wall",
        "blackstone_wall",
        "polished_blackstone_wall",
        "polished_blackstone_brick_wall",
        "cobbled_deepslate_wall",
        "polished_deepslate_wall",
        "deepslate_brick_wall",
        "deepslate_tile_wall",
        "anvil",
        "chipped_anvil",
        "damaged_anvil",
        "chiseled_quartz_block",
        "quartz_block",
        "quartz_bricks",
        "quartz_pillar",
        "quartz_stairs",
        "white_terracotta",
        "orange_terracotta",
        "magenta_terracotta",
        "light_blue_terracotta",
        "yellow_terracotta",
        "lime_terracotta",
        "pink_terracotta",
        "gray_terracotta",
        "light_gray_terracotta",
        "cyan_terracotta",
        "purple_terracotta",
        "blue_terracotta",
        "brown_terracotta",
        "green_terracotta",
        "red_terracotta",
        "black_terracotta",
        "terracotta",
        "packed_ice",
        "prismarine",
        "prismarine_bricks",
        "dark_prismarine",
        "prismarine_stairs",
        "prismarine_brick_stairs",
        "dark_prismarine_stairs",
        "red_sandstone",
        "chiseled_red_sandstone",
        "cut_red_sandstone",
        "red_sandstone_stairs",
        "magma_block",
        "red_nether_bricks",
        "bone_block",
        "shulker_box",
        "white_shulker_box",
        "orange_shulker_box",
        "magenta_shulker_box",
        "light_blue_shulker_box",
        "yellow_shulker_box",
        "lime_shulker_box",
        "pink_shulker_box",
        "gray_shulker_box",
        "light_gray_shulker_box",
        "cyan_shulker_box",
        "purple_shulker_box",
        "blue_shulker_box",
        "brown_shulker_box",
        "green_shulker_box",
        "red_shulker_box",
        "black_shulker_box",
        "white_glazed_terracotta",
        "orange_glazed_terracotta",
        "magenta_glazed_terracotta",
        "light_blue_glazed_terracotta",
        "yellow_glazed_terracotta",
        "lime_glazed_terracotta",
        "pink_glazed_terracotta",
        "gray_glazed_terracotta",
        "light_gray_glazed_terracotta",
        "cyan_glazed_terracotta",
        "purple_glazed_terracotta",
        "blue_glazed_terracotta",
        "brown_glazed_terracotta",
        "green_glazed_terracotta",
        "red_glazed_terracotta",
        "black_glazed_terracotta",
        "white_concrete",
        "orange_concrete",
        "magenta_concrete",
        "light_blue_concrete",
        "yellow_concrete",
        "lime_concrete",
        "pink_concrete",
        "gray_concrete",
        "light_gray_concrete",
        "cyan_concrete",
        "purple_concrete",
        "blue_concrete",
        "brown_concrete",
        "green_concrete",
        "red_concrete",
        "black_concrete",
        "dead_tube_coral_block",
        "dead_brain_coral_block",
        "dead_bubble_coral_block",
        "dead_fire_coral_block",
        "dead_horn_coral_block",
        "tube_coral_block",
        "brain_coral_block",
        "bubble_coral_block",
        "fire_coral_block",
        "horn_coral_block",
        "dead_brain_coral",
        "dead_bubble_coral",
        "dead_fire_coral",
        "dead_horn_coral",
        "dead_tube_coral",
        "dead_tube_coral_fan",
        "dead_brain_coral_fan",
        "dead_bubble_coral_fan",
        "dead_fire_coral_fan",
        "dead_horn_coral_fan",
        "blue_ice",
        "conduit",
        "polished_granite_stairs",
        "smooth_red_sandstone_stairs",
        "mossy_stone_brick_stairs",
        "polished_diorite_stairs",
        "mossy_cobblestone_stairs",
        "end_stone_brick_stairs",
        "stone_stairs",
        "smooth_sandstone_stairs",
        "smooth_quartz_stairs",
        "granite_stairs",
        "andesite_stairs",
        "red_nether_brick_stairs",
        "polished_andesite_stairs",
        "diorite_stairs",
        "cobbled_deepslate_stairs",
        "polished_deepslate_stairs",
        "deepslate_brick_stairs",
        "deepslate_tile_stairs",
        "polished_granite_slab",
        "smooth_red_sandstone_slab",
        "mossy_stone_brick_slab",
        "polished_diorite_slab",
        "mossy_cobblestone_slab",
        "end_stone_brick_slab",
        "smooth_sandstone_slab",
        "smooth_quartz_slab",
        "granite_slab",
        "andesite_slab",
        "red_nether_brick_slab",
        "polished_andesite_slab",
        "diorite_slab",
        "cobbled_deepslate_slab",
        "polished_deepslate_slab",
        "deepslate_brick_slab",
        "deepslate_tile_slab",
        "redstone_block",
        "piston",
        "sticky_piston",
        "observer",
        "hopper",
        "dispenser",
        "dropper",
        "lightning_rod",
        "stone_button",
        "polished_blackstone_button",
        "stone_pressure_plate",
        "polished_blackstone_pressure_plate",
        "light_weighted_pressure_plate",
        "heavy_weighted_pressure_plate",
        "iron_door",
        "copper_door",
        "exposed_copper_door",
        "weathered_copper_door",
        "oxidized_copper_door",
        "waxed_copper_door",
        "waxed_exposed_copper_door",
        "waxed_weathered_copper_door",
        "waxed_oxidized_copper_door",
        "iron_trapdoor",
        "copper_trapdoor",
        "exposed_copper_trapdoor",
        "weathered_copper_trapdoor",
        "oxidized_copper_trapdoor",
        "waxed_copper_trapdoor",
        "waxed_exposed_copper_trapdoor",
        "waxed_weathered_copper_trapdoor",
        "waxed_oxidized_copper_trapdoor",
        "powered_rail",
        "detector_rail",
        "rail",
        "activator_rail",
        "crafter",
        "brewing_stand",
        "cauldron",
        "smoker",
        "blast_furnace",
        "grindstone",
        "stonecutter",
        "bell",
        "lantern",
        "soul_lantern",
        "lodestone",
        "crying_obsidian",
        "blackstone",
        "blackstone_slab",
        "blackstone_stairs",
        "gilded_blackstone",
        "polished_blackstone",
        "polished_blackstone_slab",
        "polished_blackstone_stairs",
        "chiseled_polished_blackstone",
        "polished_blackstone_bricks",
        "polished_blackstone_brick_slab",
        "polished_blackstone_brick_stairs",
        "cracked_polished_blackstone_bricks",
        "respawn_anchor",
        "small_amethyst_bud",
        "medium_amethyst_bud",
        "large_amethyst_bud",
        "amethyst_cluster",
        "pointed_dripstone",
        "copper_grate",
        "exposed_copper_grate",
        "weathered_copper_grate",
        "oxidized_copper_grate",
        "waxed_copper_grate",
        "waxed_exposed_copper_grate",
        "waxed_weathered_copper_grate",
        "waxed_oxidized_copper_grate",
        "copper_bulb",
        "exposed_copper_bulb",
        "weathered_copper_bulb",
        "oxidized_copper_bulb",
        "waxed_copper_bulb",
        "waxed_exposed_copper_bulb",
        "waxed_weathered_copper_bulb",
        "waxed_oxidized_copper_bulb",
        "piston_head",
        "water_cauldron",
        "lava_cauldron",
        "powder_snow_cauldron",
        "dead_tube_coral_wall_fan",
        "dead_brain_coral_wall_fan",
        "dead_bubble_coral_wall_fan",
        "dead_fire_coral_wall_fan",
        "dead_horn_coral_wall_fan"
    ],
    "logs": [
        "oak_log",
        "spruce_log",
        "birch_log",
        "jungle_log",
        "acacia_log",
        "cherry_log",
        "dark_oak_log",
        "mangrove_log",
        "crimson_stem",
        "warped_stem",
        "stripped_oak_log",
        "stripped_spruce_log",
        "stripped_birch_log",
        "stripped_jungle_log",
        "stripped_acacia_log",
        "stripped_cherry_log",
        "stripped_dark_oak_log",
        "stripped_mangrove_log",
        "stripped_crimson_stem",
        "stripped_warped_stem",
        "stripped_oak_wood",
        "stripped_spruce_wood",
        "stripped_birch_wood",
        "stripped_jungle_wood",
        "stripped_acacia_wood",
        "stripped_cherry_wood",
        "stripped_dark_oak_wood",
        "stripped_mangrove_wood",
        "stripped_crimson_hyphae",
        "stripped_warped_hyphae",
        "oak_wood",
        "spruce_wood",
        "birch_wood",
        "jungle_wood",
        "acacia_wood",
        "cherry_wood",
        "dark_oak_wood",
        "mangrove_wood",
        "crimson_hyphae",
        "warped_hyphae"
    ],
    "slabs": [
        "tuff_slab",
        "polished_tuff_slab",
        "tuff_brick_slab",
        "cut_copper_slab",
        "exposed_cut_copper_slab",
        "weathered_cut_copper_slab",
        "oxidized_cut_copper_slab",
        "waxed_cut_copper_slab",
        "waxed_exposed_cut_copper_slab",
        "waxed_weathered_cut_copper_slab",
        "waxed_oxidized_cut_copper_slab",
        "oak_slab",
        "spruce_slab",
        "birch_slab",
        "jungle_slab",
        "acacia_slab",
        "cherry_slab",
        "dark_oak_slab",
        "mangrove_slab",
        "bamboo_slab",
        "bamboo_mosaic_slab",
        "crimson_slab",
        "warped_slab",
        "stone_slab",
        "smooth_stone_slab",
        "sandstone_slab",
        "cut_sandstone_slab",
        "petrified_oak_slab",
        "cobblestone_slab",
        "brick_slab",
        "stone_brick_slab",
        "mud_brick_slab",
        "nether_brick_slab",
        "quartz_slab",
        "red_sandstone_slab",
        "cut_red_sandstone_slab",
        "purpur_slab",
        "prismarine_slab",
        "prismarine_brick_slab",
        "dark_prismarine_slab",
        "polished_granite_slab",
        "smooth_red_sandstone_slab",
        "mossy_stone_brick_slab",
        "polished_diorite_slab",
        "mossy_cobblestone_slab",
        "end_stone_brick_slab",
        "smooth_sandstone_slab",
        "smooth_quartz_slab",
        "granite_slab",
        "andesite_slab",
        "red_nether_brick_slab",
        "polished_andesite_slab",
        "diorite_slab",
        "cobbled_deepslate_slab",
        "polished_deepslate_slab",
        "deepslate_brick_slab",
        "deepslate_tile_slab",
        "blackstone_slab",
        "polished_blackstone_slab",
        "polished_blackstone_brick_slab"
    ]
}