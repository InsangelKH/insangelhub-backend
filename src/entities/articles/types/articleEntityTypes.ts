export type ArticleType = 'IT' | 'ECONOMICS' | 'LIFE'

interface TextBlock {
    type: 'TEXT';
    title: string;
    paragraphs: string[];
}

interface CodeBlock {
    type: 'CODE';
    code: string;
}

interface ImageBlock {
    type: 'IMAGE';
    src: string;
    title: string;
}

export type BlockType = TextBlock | CodeBlock | ImageBlock
