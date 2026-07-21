---
icon: lucide/app-window
tags:
    - Develop
    - CodeKit
---

# CodeKit

SiFli CodeKit is the VS Code extension for SiFli-SDK development. It guides SDK setup, project creation, configuration, build, flash, and monitor workflows.

Use [Getting Started with CodeKit](../../../getting-started/sifli/getting-started-sifli-codekit.md) for the first run. This page explains where CodeKit fits in the development workflow.

Primary reference:

- [SiFli CodeKit getting started](https://docs.sifli.com/projects/codekit/get-started/)

## Best Use Cases

Use CodeKit when you want:

- A VS Code-centered SDK workflow.
- Guided project setup.
- Board and project configuration from the editor.
- Build/flash/monitor actions without memorizing every command.
- A smoother path for developers new to SiFli-SDK.

Use the command-line SDK flow when you are writing CI scripts, debugging toolchain path issues, or preparing factory/release procedures. CodeKit is a developer productivity layer, not a substitute for understanding the SDK build.

## Relationship to SiFli-SDK

CodeKit wraps the SDK workflow. It does not replace the SDK. The same underlying ideas still matter:

- SDK root.
- Board name.
- Project directory.
- Build output.
- Flash/download path.
- Serial monitor.

If a CodeKit action fails, reproduce the underlying SDK command when possible. That makes bug reports clearer and helps separate extension issues from SDK issues.

## Practical Workflow

1. Install VS Code.
2. Install SiFli-SDK-CodeKit.
3. Let CodeKit install or locate SiFli-SDK.
4. Create or open a project.
5. Select the board.
6. Build.
7. Flash.
8. Monitor serial output.

## What to Record

For every CodeKit project, record:

- CodeKit extension version.
- SiFli-SDK path and SDK branch.
- Board selected in CodeKit.
- Equivalent SDK board name.
- Build output directory.
- Flash/download behavior.
- Serial monitor baud rate.

This makes it possible to reproduce a GUI action from the command line when needed.

## Troubleshooting Strategy

<div align="center"><em>Table: Troubleshooting Strategy</em></div>

<div align="center" markdown>

| Failure | Best next step |
|:--------|:---------------|
| SDK not found | Re-select the SDK root and confirm the SDK install completed. |
| Build fails | Reproduce the same project with `scons` if possible. |
| Flash fails | Check the serial port, close monitors, and confirm download mode. |
| Monitor shows garbage | Confirm baud rate and selected port. |
| UI command missing | Use the command palette and search for `SiFli`. |

</div>

## SiFli Team Should Add

- A stable command list with screenshots.
- A board-label to SDK-board-name mapping.
- Clear guidance for where CodeKit stores settings.
- Offline install instructions.
- Error-message references for setup, build, flash, and monitor failures.
- A "reproduce this CodeKit action in terminal" appendix.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
