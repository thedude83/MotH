// script-block — inline <script> passthrough. Write JS at flat indentation inside the block.
export const scriptBlock = {
  render({ body }) {
    return `<script>\n${body}\n</script>`;
  }
};
