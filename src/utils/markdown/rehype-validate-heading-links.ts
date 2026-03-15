import { Root } from "hast";
import { Plugin } from "unified";
import { CONTINUE, visit } from "unist-util-visit";
import { isMarkdownVFile } from "./types";

const PLUGIN_NAME = "rehypeValidateHeadingLinks";

/**
 * Plugin to validate anchor links to headings and ensure their case matches their target heading IDs.
 */
export const rehypeValidateHeadingLinks: Plugin<[], Root> = () => {
	return (tree, file) => {
		if (!isMarkdownVFile(file)) {
			return;
		}

		const headings = file.data.headingsWithIds;
		const headingSlugsMap = new Map<string, string>();
		for (const { slug } of headings) {
			headingSlugsMap.set(slug.toLowerCase(), slug);
		}

		visit(tree, { type: "element", tagName: "a" }, (node) => {
			const href = node.properties["href"];
			if (typeof href !== "string" || !href.startsWith("#")) return CONTINUE;

			const headingSlug = headingSlugsMap.get(href.slice(1).toLowerCase());
			if (!headingSlug) {
				console.warn(
					`[${PLUGIN_NAME}] Unknown anchor link to heading "${href}" in "${file.path}".`,
				);
				return CONTINUE;
			}

			node.properties["href"] = headingSlug;
		});
	};
};
