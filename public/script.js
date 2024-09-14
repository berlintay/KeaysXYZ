name: Check Status

on:
  schedule:
    - cron: '0 * * * *' # Every hour
  workflow_dispatch: # Allows manual triggering

jobs:
  check:
    runs-on: ubuntu-latest

    steps:
      - name: Check if the website is responding
        id: check
        run: |
          status=$(curl -Is http://www.keays.xyz | head -n 1 | grep "200 OK" || echo "down")
          echo "status=$status" >> $GITHUB_ENV

      - name: Notify
        if: always()
        env:
          PUSHOVER_USER_KEY: ${{ secrets.PUSHOVER_USER_KEY }}
          PUSHOVER_API_TOKEN: ${{ secrets.PUSHOVER_API_TOKEN }}
        run: |
          notify_status() {
            local message
            if [ "$1" = "down" ]; then
              message="Website is down!"
            else
              message="Website is up and running."
            fi
            echo "::warning ::$message"
            curl -s --compressed \
              --form-string "token=$PUSHOVER_API_TOKEN" \
              --form-string "user=$PUSHOVER_USER_KEY" \
              --form-string "message=$message" \
              https://api.pushover.net/1/messages.json
          }

          notify_status "$status"
