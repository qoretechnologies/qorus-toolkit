import type { JSONOutput } from 'typedoc';
/**
 * Parses data from a comment reflection.
 * @since 1.0.0
 */
export declare class CommentParser {
    /**
     * The description of this comment.
     * @since 1.0.0
     */
    readonly description: string | null;
    /**
     * The block tags of this comment.
     * @since 1.0.0
     */
    readonly blockTags: CommentParser.BlockTag[];
    /**
     * The modifier tags of this comment.
     * @since 1.0.0
     */
    readonly modifierTags: string[];
    constructor(data: CommentParser.Data);
    /**
     * The filtered `@see` tags of this comment.
     * @since 1.0.0
     */
    get see(): CommentParser.BlockTag[];
    /**
     * The filtered `@example` tags of this comment.
     * @since 1.0.0
     */
    get example(): CommentParser.BlockTag[];
    /**
     * Whether the comment has an `@deprecated` tag.
     * @since 1.0.0
     */
    get deprecated(): boolean;
    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    toJSON(): CommentParser.Json;
    /**
     * Generates a new {@link CommentParser} instance from the given data.
     * @since 1.0.0
     * @param comment The comment to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromTypeDoc(comment: JSONOutput.Comment): CommentParser;
    /**
     * Generates a new {@link ClassConstructorParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    static generateFromJson(json: CommentParser.Json): CommentParser;
}
export declare namespace CommentParser {
    interface Data {
        /**
         * The description of this comment.
         * @since 1.0.0
         */
        description: string | null;
        /**
         * The block tags of this comment.
         * @since 1.0.0
         */
        blockTags: BlockTag[];
        /**
         * The modifier tags of this comment.
         * @since 1.0.0
         */
        modifierTags: string[];
    }
    interface Json {
        /**
         * The description of this comment.
         * @since 1.0.0
         */
        description: string | null;
        /**
         * The block tags of this comment.
         * @since 1.0.0
         */
        blockTags: BlockTag[];
        /**
         * The modifier tags of this comment.
         * @since 1.0.0
         */
        modifierTags: string[];
    }
    /**
     * A tag of a comment.
     * @since 1.0.0
     */
    interface BlockTag {
        /**
         * The name of this tag.
         * @since 1.0.0
         */
        name: string;
        /**
         * The text of this tag.
         * @since 1.0.0
         */
        text: string;
    }
}
//# sourceMappingURL=CommentParser.d.ts.map