
cd "$( dirname "${BASH_SOURCE[0]}" )"

while true
do
	sleep .1
	echo "less/main.less compiled" $(date)
	lessc less/main.less css/main.css -x
	if [[ $? != 0 ]]
		then beep -f 200 -l 5
		sleep 1
	fi
done
