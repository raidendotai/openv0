const userInputComponents = {
  query: {
    description: "a user input paragraph and a send button",
    framework: "react",
    components: "shadcn",
    icons: "lucide",
  },
  pipeline: {
    passes: {
      "design-component-new-from-description": {
        index: 0,
        response: {
          type: "component-design-task",
          success: true,
          data: {
            name: "UserInputWithSendButton",
            description: {
              user: "a user input paragraph and a send button",
              llm: "The component is required to have a user input field allowing multiline text (paragraph) input, along with a 'send' button next to it that will trigger a specific action (for example, send the written text somewhere) when clicked. The input field and the 'send' button should be placed next to each other in a neat, clean layout.",
            },
            icons: ["send"],
            components: [
              {
                name: "Button",
                usage: "To create the 'send' button next to the input field.",
              },
              {
                name: "Textarea",
                usage: "To allow the user to input multiline text.",
              },
            ],
          },
        },
      },
      "build-component-generation-context": {
        index: 1,
        response: {
          type: "component-design-context",
          success: true,
          data: [
            {
              role: "user",
              content:
                "Library components can be used while making the new React component\n" +
                "\n" +
                "Suggested library component (1/2) : Button - Displays a button or a component that looks like a button.\n" +
                "Suggested usage : To create the 'send' button next to the input field.\n" +
                "\n" +
                "\n" +
                "# Button can be imported into the new component like this:\n" +
                "```tsx\n" +
                'import { Button } from "@/components/ui/button"\n' +
                "```\n" +
                "\n" +
                "---\n" +
                "\n" +
                "# examples of how Button can be used inside the new component:\n" +
                "```tsx\n" +
                '<Button variant="outline">Button</Button>\n' +
                "```\n" +
                "\n" +
                "```tsx\n" +
                'import { buttonVariants } from "@/components/ui/button"\n' +
                '<Link className={buttonVariants({ variant: "outline" })}>Click here</Link>\n' +
                "```\n" +
                "\n" +
                "---\n" +
                "\n" +
                "# full code examples of React components that use Button :\n" +
                "```button-demo.tsx\n" +
                'import { Button } from "@/components/ui/button"\r\n' +
                "\r\n" +
                "export default function ButtonDemo() {\r\n" +
                "  return <Button>Button</Button>\r\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "```button-with-icon.tsx\n" +
                'import { Mail } from "lucide-react"\r\n' +
                "\r\n" +
                'import { Button } from "@/components/ui/button"\r\n' +
                "\r\n" +
                "export default function ButtonWithIcon() {\r\n" +
                "  return (\r\n" +
                "    <Button>\r\n" +
                '      <Mail className="mr-2 h-4 w-4" /> Login with Email\r\n' +
                "    </Button>\r\n" +
                "  )\r\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "```button-link.tsx\n" +
                'import { Button } from "@/components/ui/button"\r\n' +
                "\r\n" +
                "export default function ButtonLink() {\r\n" +
                '  return <Button variant="link">Link</Button>\r\n' +
                "}\n" +
                "```\n" +
                "\n" +
                "```button-outline.tsx\n" +
                'import { Button } from "@/components/ui/button"\r\n' +
                "\r\n" +
                "export default function ButtonOutline() {\r\n" +
                '  return <Button variant="outline">Outline</Button>\r\n' +
                "}\n" +
                "```\n" +
                "\n" +
                "```button-secondary.tsx\n" +
                'import { Button } from "@/components/ui/button"\r\n' +
                "\r\n" +
                "export default function ButtonSecondary() {\r\n" +
                '  return <Button variant="secondary">Secondary</Button>\r\n' +
                "}\n" +
                "```\n" +
                "\n" +
                "```button-icon.tsx\n" +
                'import { ChevronRight } from "lucide-react"\r\n' +
                "\r\n" +
                'import { Button } from "@/components/ui/button"\r\n' +
                "\r\n" +
                "export default function ButtonIcon() {\r\n" +
                "  return (\r\n" +
                '    <Button variant="outline" size="icon">\r\n' +
                '      <ChevronRight className="h-4 w-4" />\r\n' +
                "    </Button>\r\n" +
                "  )\r\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "```button-loading.tsx\n" +
                'import { Loader2 } from "lucide-react"\r\n' +
                "\r\n" +
                'import { Button } from "@/components/ui/button"\r\n' +
                "\r\n" +
                "export default function ButtonLoading() {\r\n" +
                "  return (\r\n" +
                "    <Button disabled>\r\n" +
                '      <Loader2 className="mr-2 h-4 w-4 animate-spin" />\r\n' +
                "      Please wait\r\n" +
                "    </Button>\r\n" +
                "  )\r\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "```button-ghost.tsx\n" +
                'import { Button } from "@/components/ui/button"\r\n' +
                "\r\n" +
                "export default function ButtonGhost() {\r\n" +
                '  return <Button variant="ghost">Ghost</Button>\r\n' +
                "}\n" +
                "```\n" +
                "\n" +
                "```button-destructive.tsx\n" +
                'import { Button } from "@/components/ui/button"\r\n' +
                "\r\n" +
                "export default function ButtonDestructive() {\r\n" +
                '  return <Button variant="destructive">Destructive</Button>\r\n' +
                "}\n" +
                "```\n" +
                "\n" +
                "```button-as-child.tsx\n" +
                'import Link from "next/link"\r\n' +
                "\r\n" +
                'import { Button } from "@/components/ui/button"\r\n' +
                "\r\n" +
                "export default function ButtonAsChild() {\r\n" +
                "  return (\r\n" +
                "    <Button asChild>\r\n" +
                '      <Link href="/login">Login</Link>\r\n' +
                "    </Button>\r\n" +
                "  )\r\n" +
                "}\n" +
                "```",
            },
            {
              role: "user",
              content:
                "Library components can be used while making the new React component\n" +
                "\n" +
                "Suggested library component (2/2) : Textarea - Displays a form textarea or a component that looks like a textarea.\n" +
                "Suggested usage : To allow the user to input multiline text.\n" +
                "\n" +
                "\n" +
                "# Textarea can be imported into the new component like this:\n" +
                "```tsx\n" +
                'import { Textarea } from "@/components/ui/textarea"\n' +
                "```\n" +
                "\n" +
                "---\n" +
                "\n" +
                "# examples of how Textarea can be used inside the new component:\n" +
                "```tsx\n" +
                "<Textarea />\n" +
                "```\n" +
                "\n" +
                "---\n" +
                "\n" +
                "# full code examples of React components that use Textarea :\n" +
                "```textarea-demo.tsx\n" +
                'import { Textarea } from "@/components/ui/textarea"\r\n' +
                "\r\n" +
                "export default function TextareaDemo() {\r\n" +
                '  return <Textarea placeholder="Type your message here." />\r\n' +
                "}\n" +
                "```\n" +
                "\n" +
                "```textarea-disabled.tsx\n" +
                'import { Textarea } from "@/components/ui/textarea"\r\n' +
                "\r\n" +
                "export default function TextareaDisabled() {\r\n" +
                '  return <Textarea placeholder="Type your message here." disabled />\r\n' +
                "}\n" +
                "```\n" +
                "\n" +
                "```textarea-with-button.tsx\n" +
                'import { Button } from "@/components/ui/button"\r\n' +
                'import { Textarea } from "@/components/ui/textarea"\r\n' +
                "\r\n" +
                "export default function TextareaWithButton() {\r\n" +
                "  return (\r\n" +
                '    <div className="grid w-full gap-2">\r\n' +
                '      <Textarea placeholder="Type your message here." />\r\n' +
                "      <Button>Send message</Button>\r\n" +
                "    </div>\r\n" +
                "  )\r\n" +
                "}\n" +
                "```",
            },
            {
              role: "user",
              content:
                "Icon elements can optionally be used when making the React component.\n" +
                "\n" +
                "---\n" +
                "\n" +
                "# example: importing icons in the component (only import the ones you need) :\n" +
                "\n" +
                "```tsx\n" +
                'import { SendHorizontal , Forward , Reply , ReplyAll , Mail , SendToBack , MailQuestion , PhoneOutgoing , Satellite } from "lucide-react";\n' +
                "```\n" +
                "\n" +
                "# example: using an icon inside the component :\n" +
                "\n" +
                "```tsx\n" +
                '<SendHorizontal className="h-4 w-4" />\n' +
                "```\n" +
                "\n" +
                "---\n" +
                "\n" +
                "\n" +
                "Here are some available icons that might be relevant to the component you are making. You can choose from them if relevant :\n" +
                "\n" +
                "```\n" +
                "- SendHorizontal , Forward , Reply , ReplyAll , Mail , SendToBack , MailQuestion , PhoneOutgoing , Satellite\n" +
                "```",
            },
          ],
        },
      },
      "generate-component-new": {
        index: 2,
        response: {
          type: "component-code",
          success: true,
          data:
            'import React from "react";\n' +
            'import { Button } from "@/components/ui/button";\n' +
            'import { Textarea } from "@/components/ui/textarea";\n' +
            'import { SendHorizontal } from "lucide-react";\n' +
            "\n" +
            "const UserInputWithSendButton: React.FC = () => (\n" +
            '  <div className="w-full h-full flex flex-row items-center space-x-4">\n' +
            "    <Textarea\n" +
            '      placeholder="Type your message here..."\n' +
            '      className="flex-grow border-gray-300 focus:border-blue-300 rounded-md shadow-sm p-2"\n' +
            "    />\n" +
            "    <Button>\n" +
            '      <SendHorizontal className="h-4 w-4 mr-2" />\n' +
            "      Send\n" +
            "    </Button>\n" +
            "  </div>\n" +
            ");\n" +
            "\n" +
            "export default UserInputWithSendButton;",
        },
      },
    },
    stages: {
      "component-design-task": {
        success: true,
        data: {
          name: "UserInputWithSendButton",
          description: {
            user: "a user input paragraph and a send button",
            llm: "The component is required to have a user input field allowing multiline text (paragraph) input, along with a 'send' button next to it that will trigger a specific action (for example, send the written text somewhere) when clicked. The input field and the 'send' button should be placed next to each other in a neat, clean layout.",
          },
          icons: ["send"],
          components: [
            {
              name: "Button",
              usage: "To create the 'send' button next to the input field.",
            },
            {
              name: "Textarea",
              usage: "To allow the user to input multiline text.",
            },
          ],
        },
      },
      "component-design-context": {
        success: true,
        data: [
          {
            role: "user",
            content:
              "Library components can be used while making the new React component\n" +
              "\n" +
              "Suggested library component (1/2) : Button - Displays a button or a component that looks like a button.\n" +
              "Suggested usage : To create the 'send' button next to the input field.\n" +
              "\n" +
              "\n" +
              "# Button can be imported into the new component like this:\n" +
              "```tsx\n" +
              'import { Button } from "@/components/ui/button"\n' +
              "```\n" +
              "\n" +
              "---\n" +
              "\n" +
              "# examples of how Button can be used inside the new component:\n" +
              "```tsx\n" +
              '<Button variant="outline">Button</Button>\n' +
              "```\n" +
              "\n" +
              "```tsx\n" +
              'import { buttonVariants } from "@/components/ui/button"\n' +
              '<Link className={buttonVariants({ variant: "outline" })}>Click here</Link>\n' +
              "```\n" +
              "\n" +
              "---\n" +
              "\n" +
              "# full code examples of React components that use Button :\n" +
              "```button-demo.tsx\n" +
              'import { Button } from "@/components/ui/button"\r\n' +
              "\r\n" +
              "export default function ButtonDemo() {\r\n" +
              "  return <Button>Button</Button>\r\n" +
              "}\n" +
              "```\n" +
              "\n" +
              "```button-with-icon.tsx\n" +
              'import { Mail } from "lucide-react"\r\n' +
              "\r\n" +
              'import { Button } from "@/components/ui/button"\r\n' +
              "\r\n" +
              "export default function ButtonWithIcon() {\r\n" +
              "  return (\r\n" +
              "    <Button>\r\n" +
              '      <Mail className="mr-2 h-4 w-4" /> Login with Email\r\n' +
              "    </Button>\r\n" +
              "  )\r\n" +
              "}\n" +
              "```\n" +
              "\n" +
              "```button-link.tsx\n" +
              'import { Button } from "@/components/ui/button"\r\n' +
              "\r\n" +
              "export default function ButtonLink() {\r\n" +
              '  return <Button variant="link">Link</Button>\r\n' +
              "}\n" +
              "```\n" +
              "\n" +
              "```button-outline.tsx\n" +
              'import { Button } from "@/components/ui/button"\r\n' +
              "\r\n" +
              "export default function ButtonOutline() {\r\n" +
              '  return <Button variant="outline">Outline</Button>\r\n' +
              "}\n" +
              "```\n" +
              "\n" +
              "```button-secondary.tsx\n" +
              'import { Button } from "@/components/ui/button"\r\n' +
              "\r\n" +
              "export default function ButtonSecondary() {\r\n" +
              '  return <Button variant="secondary">Secondary</Button>\r\n' +
              "}\n" +
              "```\n" +
              "\n" +
              "```button-icon.tsx\n" +
              'import { ChevronRight } from "lucide-react"\r\n' +
              "\r\n" +
              'import { Button } from "@/components/ui/button"\r\n' +
              "\r\n" +
              "export default function ButtonIcon() {\r\n" +
              "  return (\r\n" +
              '    <Button variant="outline" size="icon">\r\n' +
              '      <ChevronRight className="h-4 w-4" />\r\n' +
              "    </Button>\r\n" +
              "  )\r\n" +
              "}\n" +
              "```\n" +
              "\n" +
              "```button-loading.tsx\n" +
              'import { Loader2 } from "lucide-react"\r\n' +
              "\r\n" +
              'import { Button } from "@/components/ui/button"\r\n' +
              "\r\n" +
              "export default function ButtonLoading() {\r\n" +
              "  return (\r\n" +
              "    <Button disabled>\r\n" +
              '      <Loader2 className="mr-2 h-4 w-4 animate-spin" />\r\n' +
              "      Please wait\r\n" +
              "    </Button>\r\n" +
              "  )\r\n" +
              "}\n" +
              "```\n" +
              "\n" +
              "```button-ghost.tsx\n" +
              'import { Button } from "@/components/ui/button"\r\n' +
              "\r\n" +
              "export default function ButtonGhost() {\r\n" +
              '  return <Button variant="ghost">Ghost</Button>\r\n' +
              "}\n" +
              "```\n" +
              "\n" +
              "```button-destructive.tsx\n" +
              'import { Button } from "@/components/ui/button"\r\n' +
              "\r\n" +
              "export default function ButtonDestructive() {\r\n" +
              '  return <Button variant="destructive">Destructive</Button>\r\n' +
              "}\n" +
              "```\n" +
              "\n" +
              "```button-as-child.tsx\n" +
              'import Link from "next/link"\r\n' +
              "\r\n" +
              'import { Button } from "@/components/ui/button"\r\n' +
              "\r\n" +
              "export default function ButtonAsChild() {\r\n" +
              "  return (\r\n" +
              "    <Button asChild>\r\n" +
              '      <Link href="/login">Login</Link>\r\n' +
              "    </Button>\r\n" +
              "  )\r\n" +
              "}\n" +
              "```",
          },
          {
            role: "user",
            content:
              "Library components can be used while making the new React component\n" +
              "\n" +
              "Suggested library component (2/2) : Textarea - Displays a form textarea or a component that looks like a textarea.\n" +
              "Suggested usage : To allow the user to input multiline text.\n" +
              "\n" +
              "\n" +
              "# Textarea can be imported into the new component like this:\n" +
              "```tsx\n" +
              'import { Textarea } from "@/components/ui/textarea"\n' +
              "```\n" +
              "\n" +
              "---\n" +
              "\n" +
              "# examples of how Textarea can be used inside the new component:\n" +
              "```tsx\n" +
              "<Textarea />\n" +
              "```\n" +
              "\n" +
              "---\n" +
              "\n" +
              "# full code examples of React components that use Textarea :\n" +
              "```textarea-demo.tsx\n" +
              'import { Textarea } from "@/components/ui/textarea"\r\n' +
              "\r\n" +
              "export default function TextareaDemo() {\r\n" +
              '  return <Textarea placeholder="Type your message here." />\r\n' +
              "}\n" +
              "```\n" +
              "\n" +
              "```textarea-disabled.tsx\n" +
              'import { Textarea } from "@/components/ui/textarea"\r\n' +
              "\r\n" +
              "export default function TextareaDisabled() {\r\n" +
              '  return <Textarea placeholder="Type your message here." disabled />\r\n' +
              "}\n" +
              "```\n" +
              "\n" +
              "```textarea-with-button.tsx\n" +
              'import { Button } from "@/components/ui/button"\r\n' +
              'import { Textarea } from "@/components/ui/textarea"\r\n' +
              "\r\n" +
              "export default function TextareaWithButton() {\r\n" +
              "  return (\r\n" +
              '    <div className="grid w-full gap-2">\r\n' +
              '      <Textarea placeholder="Type your message here." />\r\n' +
              "      <Button>Send message</Button>\r\n" +
              "    </div>\r\n" +
              "  )\r\n" +
              "}\n" +
              "```",
          },
          {
            role: "user",
            content:
              "Icon elements can optionally be used when making the React component.\n" +
              "\n" +
              "---\n" +
              "\n" +
              "# example: importing icons in the component (only import the ones you need) :\n" +
              "\n" +
              "```tsx\n" +
              'import { SendHorizontal , Forward , Reply , ReplyAll , Mail , SendToBack , MailQuestion , PhoneOutgoing , Satellite } from "lucide-react";\n' +
              "```\n" +
              "\n" +
              "# example: using an icon inside the component :\n" +
              "\n" +
              "```tsx\n" +
              '<SendHorizontal className="h-4 w-4" />\n' +
              "```\n" +
              "\n" +
              "---\n" +
              "\n" +
              "\n" +
              "Here are some available icons that might be relevant to the component you are making. You can choose from them if relevant :\n" +
              "\n" +
              "```\n" +
              "- SendHorizontal , Forward , Reply , ReplyAll , Mail , SendToBack , MailQuestion , PhoneOutgoing , Satellite\n" +
              "```",
          },
        ],
      },
      "component-code": {
        success: true,
        data:
          'import React from "react";\n' +
          'import { Button } from "@/components/ui/button";\n' +
          'import { Textarea } from "@/components/ui/textarea";\n' +
          'import { SendHorizontal } from "lucide-react";\n' +
          "\n" +
          "const UserInputWithSendButton: React.FC = () => (\n" +
          '  <div className="w-full h-full flex flex-row items-center space-x-4">\n' +
          "    <Textarea\n" +
          '      placeholder="Type your message here..."\n' +
          '      className="flex-grow border-gray-300 focus:border-blue-300 rounded-md shadow-sm p-2"\n' +
          "    />\n" +
          "    <Button>\n" +
          '      <SendHorizontal className="h-4 w-4 mr-2" />\n' +
          "      Send\n" +
          "    </Button>\n" +
          "  </div>\n" +
          ");\n" +
          "\n" +
          "export default UserInputWithSendButton;",
      },
    },
  },
};

let userInputComponents_badImportsAxios = { ...userInputComponents };
userInputComponents_badImportsAxios.pipeline.stages[`component-code`].data =
  "" +
  'import React from "react";\n' +
  'import { Button } from "@/components/ui/button";\n' +
  'import { Textarea } from "@/components/ui/textarea";\n' +
  'import { SendHorizontal } from "lucide-react";\n' +
  'import axios from "axios";\n' +
  `import * as Yup from 'axios';\n` +
  "\n" +
  "const UserInputWithSendButton: React.FC = () => (\n" +
  '  <div className="w-full h-full flex flex-row items-center space-x-4">\n' +
  "    <Textarea\n" +
  '      placeholder="Type your message here..."\n' +
  '      className="flex-grow border-gray-300 focus:border-blue-300 rounded-md shadow-sm p-2"\n' +
  "    />\n" +
  "    <Button>\n" +
  '      <SendHorizontal className="h-4 w-4 mr-2" />\n' +
  "      Send\n" +
  "    </Button>\n" +
  "  </div>\n" +
  ");\n" +
  "\n" +
  "export default UserInputWithSendButton;";

let userInputComponents_badImportsLocalViewPlusAxios = {
  ...userInputComponents,
};
userInputComponents_badImportsLocalViewPlusAxios.pipeline.stages[
  `component-code`
].data =
  "" +
  'import React from "react";\n' +
  'import { Button } from "@/components/ui/button";\n' +
  'import { Textarea } from "@/components/ui/textarea";\n' +
  'import { SendHorizontal } from "lucide-react";\n' +
  "\n" +
  "const UserInputWithSendButton: React.FC = () => (\n" +
  '  <div className="w-full h-full flex flex-row items-center space-x-4">\n' +
  "    <Textarea\n" +
  '      placeholder="Type your message here..."\n' +
  '      className="flex-grow border-gray-300 focus:border-blue-300 rounded-md shadow-sm p-2"\n' +
  "    />\n" +
  "    <Button>\n" +
  '      <SendHorizontal className="h-4 w-4 mr-2" />\n' +
  "      Send\n" +
  "    </Button>\n" +
  "  </div>\n" +
  ");\n" +
  "\n" +
  "export default UserInputWithSendButton;";

let userInputComponents_badSyntax = { ...userInputComponents };
userInputComponents_badSyntax.pipeline.stages[`component-code`].data =
  "" +
  'import React from "react";\n' +
  'import { Button } from "@/components/ui/button";\n' +
  'import { Textarea } from "@/components/ui/textarea";\n' +
  'import { SendHorizontal } from "lucide-react";\n' +
  "\n" +
  "const UserInputWithSendButton: React.FC = () => (\n" +
  '  <div className="w-full h-full flex flex-row items-center space-x-4">\n' +
  "    <Textarea\n" +
  '      placeholder="Type your message here..."\n' +
  '      className="flex-grow border-gray-300 focus:border-blue-300 rounded-md shadow-sm p-2"\n' +
  "    />\n" +
  "    <Button>\n" +
  '      <SendHorizontal className="h-4 w-4 mr-2" />\n' +
  "      Send\n" +
  "    </Button>\n" +
  "  </div>\n" +
  ");\n" +
  "\n" +
  "export default UserInputWithSendButton;";

let userInputComponents_missingImports = { ...userInputComponents };
userInputComponents_missingImports.pipeline.stages[`component-code`].data =
  "" +
  'import React from "react";\n' +
  'import { Button } from "@/components/ui/button";\n' +
  'import { Textarea } from "@/components/ui/textarea";\n' +
  'import { SendHorizontal } from "lucide-react";\n' +
  "\n" +
  "const UserInputWithSendButton: React.FC = () => (\n" +
  '  <div className="w-full h-full flex flex-row items-center space-x-4">\n' +
  "    <Textarea\n" +
  '      placeholder="Type your message here..."\n' +
  '      className="flex-grow border-gray-300 focus:border-blue-300 rounded-md shadow-sm p-2"\n' +
  "    />\n" +
  "    <Button>\n" +
  '      <SendHorizontal className="h-4 w-4 mr-2" />\n' +
  "      Send\n" +
  "    </Button>\n" +
  "  </div>\n" +
  ");\n" +
  "\n" +
  "export default UserInputWithSendButton;";

let userInputComponents_duplicateImports = {
  ...userInputComponents,
};
userInputComponents_duplicateImports.pipeline.stages[`component-code`].data =
  "" +
  'import React from "react";\n' +
  'import { Button } from "@/components/ui/button";\n' +
  'import { Textarea } from "@/components/ui/textarea";\n' +
  'import { SendHorizontal } from "lucide-react";\n' +
  'import { SendHorizontal } from "lucide-react";\n' +
  "\n" +
  "const UserInputWithSendButton: React.FC = () => (\n" +
  '  <div className="w-full h-full flex flex-row items-center space-x-4">\n' +
  "    <Textarea\n" +
  '      placeholder="Type your message here..."\n' +
  '      className="flex-grow border-gray-300 focus:border-blue-300 rounded-md shadow-sm p-2"\n' +
  "    />\n" +
  "    <Button>\n" +
  '      <SendHorizontal className="h-4 w-4 mr-2" />\n' +
  "      Send\n" +
  "    </Button>\n" +
  "  </div>\n" +
  ");\n" +
  "\n" +
  "export default UserInputWithSendButton;";

module.exports = {
  userInputComponents_badImportsAxios,
  userInputComponents_badImportsLocalViewPlusAxios,
  userInputComponents_duplicateImports,
  userInputComponents_badSyntax,
  userInputComponents_missingImports,
};
