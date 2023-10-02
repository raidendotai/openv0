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

let badImportsAxios = JSON.parse(JSON.stringify(userInputComponents));
badImportsAxios.pipeline.stages[`component-code`].data =
  "" +
  'import React from "react";\n' +
  'import { Button } from "@/components/ui/button";\n' +
  'import { Textarea } from "@/components/ui/textarea";\n' +
  'import { SendHorizontal } from "lucide-react";\n' +
  'import axios from "axios";\n' +
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

let badImportsLocalView = JSON.parse(JSON.stringify(userInputComponents));
badImportsLocalView.pipeline.stages[`component-code`].data =
  "" +
  'import React from "react";\n' +
  'import { Button } from "@/components/ui/button";\n' +
  'import { Textarea } from "@/components/ui/textarea";\n' +
  'import { SendHorizontal } from "lucide-react";\n' +
  'import { WhateverLocal } from "./Whatever.tsx";\n' +
  "\n" +
  "const UserInputWithSendButton: React.FC = () => (\n" +
  '  <div className="w-full h-full flex flex-row items-center space-x-4">\n' +
  "    <WhateverLocal\n" +
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

let missingImportsPlusIllegalImports = JSON.parse(
  JSON.stringify(userInputComponents),
);
missingImportsPlusIllegalImports.pipeline.stages[`component-code`].data = `
import hallucinate from "hallucinaxios";
import { WhateverLocal } from "./Whatever.tsx";
export default function App() {
  function crasher(){
    return hallucinate.get('https://whatever.com')
  }
  return (
    <div className="text-lg max-w-3xl mx-auto">
      hello world
      <WhateverLocal />
      <Button>click to send</Button>
    </div>
  )
}
`.trim();

let badSyntaxSneaky = JSON.parse(JSON.stringify(userInputComponents));
badSyntaxSneaky.pipeline.stages[`component-code`].data =
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

let missingImports = JSON.parse(JSON.stringify(userInputComponents));
missingImports.pipeline.stages[`component-code`].data =
  "" +
  'import React from "react";\n' +
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

let duplicateImports = JSON.parse(JSON.stringify(userInputComponents));
duplicateImports.pipeline.stages[`component-code`].data =
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

let svelteExample = JSON.parse(JSON.stringify(userInputComponents));
svelteExample.pipeline.stages[`component-code`].data = `
<script lang="ts">
  import { Bell, Check } from "radix-icons-svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { Switch } from "$lib/components/ui/switch";
  import { Switch , Blades } from "$lib/components/ui/switch";

  const notifications = [
    {
      title: "Your call has been confirmed.",
      description: "1 hour ago"
    },
    {
      title: "You have a new message!",
      description: "1 hour ago"
    },
    {
      title: "Your subscription is expiring soon!",
      description: "2 hours ago"
    }
  ];
</script>

<Card.Root class="w-[380px]">
  <Card.Header>
    <Card.Title>Notifications</Card.Title>
    <Card.Description>You have 3 unread messages.</Card.Description>
  </Card.Header>
  <Card.Content class="grid gap-4">
    <div class="flex items-center space-x-4 rounded-md border p-4">
      <Bell />
      <div class="flex-1 space-y-1">
        <p class="text-sm font-medium leading-none">Push Notifications</p>
        <p class="text-sm text-muted-foreground">
          Send notifications to device.
        </p>
      </div>
      <Switch />
    </div>
    <div>
      {#each notifications as notification, idx (idx)}
        <div
          class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
        >
          <span class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div class="space-y-1">
            <p class="text-sm font-medium leading-none">
              {notification.title}
            </p>
            <p class="text-sm text-muted-foreground">
              {notification.description}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </Card.Content>
  <Card.Footer>
    <Button class="w-full">
      <Check class="mr-2 h-4 w-4" /> Mark all as read
    </Button>
  </Card.Footer>
</Card.Root>
`.trim();
svelteExample.query.framework = `svelte`;
svelteExample.query.components = `shadcn`;

let badSyntaxReact = JSON.parse(JSON.stringify(userInputComponents));
badSyntaxReact.pipeline.stages[`component-code`].data = `

export default function App() => {
  return (
    <div className="text-lg max-w-3xl mx-auto">
      an example react block with no imports
    </div>
  )
}

`.trim();

let noImportsReact = JSON.parse(JSON.stringify(userInputComponents));
noImportsReact.pipeline.stages[`component-code`].data = `

export default function App() {
  return (
    <div className="text-lg max-w-3xl mx-auto">
      an example react block with no imports
    </div>
  )
}
`.trim();

let axiosReact = JSON.parse(JSON.stringify(userInputComponents));
axiosReact.pipeline.stages[`component-code`].data = `
import axios from "axios";
export default function App() {
  function ask_api(){
    return axios.get('https://whatever.com')
  }
  return (
    <div className="text-lg max-w-3xl mx-auto">
      an example react block with no imports
    </div>
  )
}
`.trim();

let noImportsSvelte = JSON.parse(JSON.stringify(userInputComponents));
noImportsSvelte.pipeline.stages[`component-code`].data = `
<script>
</script>
<div class="text-lg max-w-3xl mx-auto">
  an example svelte block with no imports
</div>
`.trim();
noImportsSvelte.query.framework = `svelte`;
noImportsSvelte.query.components = `shadcn`;

let noImportsNoScriptSvelte = JSON.parse(JSON.stringify(userInputComponents));
noImportsNoScriptSvelte.pipeline.stages[`component-code`].data = `
<div class="text-lg max-w-3xl mx-auto">
  an example svelte block with no imports
</div>
`.trim();
noImportsNoScriptSvelte.query.framework = `svelte`;
noImportsNoScriptSvelte.query.components = `shadcn`;

module.exports = {
  // should be automatically fixed by `validate-check-generated-component`
  badImportsAxios,
  duplicateImports,

  // should return error in `validate-check-generated-component` ; and be picked by `validate-fix-generated-component` for fixing
  badImportsLocalView,
  badSyntaxReact,
  missingImports,
  missingImportsPlusIllegalImports,

  // is not detected by babel but is wrong wray to construct a react component
  badSyntaxSneaky,

  // should go through
  svelteExample,
  noImportsReact,
  noImportsSvelte,
  noImportsNoScriptSvelte,
  axiosReact,
};
