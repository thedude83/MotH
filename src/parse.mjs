// GRAMMAR  /fu/  — built once. Raw text -> an indent tree. Knows no vocabulary.
// One job: turn lines + indentation into nested nodes. Nothing else.
export function parse(src) {
  const lines = src.split('\n').filter((l) => l.trim() !== '');
  const root = { children: [] };
  const stack = [{ node: root, indent: -1 }];
  for (const line of lines) {
    const indent = line.length - line.trimStart().length;
    const text = line.trim();
    const sp = text.indexOf(' ');
    const name = sp === -1 ? text : text.slice(0, sp);
    const rest = sp === -1 ? '' : text.slice(sp + 1).trim();
    const node = { name, rest, text, children: [] };
    while (indent <= stack[stack.length - 1].indent) stack.pop();
    stack[stack.length - 1].node.children.push(node);
    stack.push({ node, indent });
  }
  return root.children;
}
