"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentParser = void 0;
/**
 * Parses data from a comment reflection.
 * @since 1.0.0
 */
class CommentParser {
    constructor(data) {
        /**
         * The description of this comment.
         * @since 1.0.0
         */
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The block tags of this comment.
         * @since 1.0.0
         */
        Object.defineProperty(this, "blockTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The modifier tags of this comment.
         * @since 1.0.0
         */
        Object.defineProperty(this, "modifierTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { description, blockTags, modifierTags } = data;
        this.description = description;
        this.blockTags = blockTags;
        this.modifierTags = modifierTags;
    }
    /**
     * The filtered `@see` tags of this comment.
     * @since 1.0.0
     */
    get see() {
        return this.blockTags.filter((tag) => tag.name === 'see');
    }
    /**
     * The filtered `@example` tags of this comment.
     * @since 1.0.0
     */
    get example() {
        return this.blockTags.filter((tag) => tag.name === 'example');
    }
    /**
     * Whether the comment has an `@deprecated` tag.
     * @since 1.0.0
     */
    get deprecated() {
        return this.modifierTags.some((tag) => tag === 'deprecated');
    }
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON() {
        return {
            description: this.description,
            blockTags: this.blockTags,
            modifierTags: this.modifierTags
        };
    }
    /**
     * Generates a new {@link CommentParser} instance from the given data.
     * @since 1.0.0
     * @param comment The comment to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(comment) {
        const { summary, blockTags = [], modifierTags = [] } = comment;
        return new CommentParser({
            description: summary.length
                ? summary.map((summary) => (summary.kind === 'inline-tag' ? `{${summary.tag} ${summary.text}}` : summary.text)).join('')
                : null,
            blockTags: blockTags.map((tag) => ({
                name: tag.name ?? tag.tag.replace(/@/, ''),
                text: tag.content.map((content) => (content.kind === 'inline-tag' ? `{${content.tag} ${content.text}}` : content.text)).join('')
            })),
            modifierTags
        });
    }
    /**
     * Generates a new {@link ClassConstructorParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json) {
        const { description, blockTags, modifierTags } = json;
        return new CommentParser({
            description,
            blockTags,
            modifierTags
        });
    }
}
exports.CommentParser = CommentParser;
//# sourceMappingURL=CommentParser.js.map