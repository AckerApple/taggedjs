#!/bin/bash

# Run Claude Code and play sound when it exits (returns to prompt)
claude "$@"
afplay /System/Library/Sounds/Glass.aiff