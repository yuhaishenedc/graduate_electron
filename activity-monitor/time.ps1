# ��ȡ��ǰ UTC ʱ��������룩
$start_time = [datetime]::UtcNow
$startTimestamp = [long]($start_time - [datetime]"1970-01-01T00:00:00").TotalMilliseconds

# Start-Process ����������һ���µĽ��̵� PowerShell cmdlet��
# "cmd.exe" ����Ҫ�����ĳ��򣬼������н�������
# -ArgumentList "/c npm start": ʹ�� -ArgumentList �������������в����� cmd.exe������ /c ���� cmd.exe ִ����ָ���������ر������д��ڡ�npm start ������ Node.js ��Ŀ�ĳ������
Start-Process "cmd.exe" -ArgumentList "/c npm start"

# �ȴ��ļ�д����ɣ��������Ҫ����ʵ����������ȴ�ʱ��
Start-Sleep -Seconds 10

# Get-Content �� PowerShell ��������ȡ�ļ����ݵ��������Ĭ�ϻ��ȡ�ļ��е������ı����ݣ���������Ϊ�ַ������ء�
# -Path "endTime.txt" ָ�����ļ���·����
# [long] ������ת��������������������ת����������int�����͡�
$endTime = [long](Get-Content -Path "endTime.txt")

# �� PowerShell DateTime ת��Ϊʱ��������룩
$startTimestamp = [long](([datetime]$start_time).Subtract([datetime]"1970-01-01T00:00:00").TotalMilliseconds)

# ����ʱ���
$timeTaken = $endTime - $startTimestamp

# ��ʾʱ�俪��
Write-Output "Time taken from start to window show: $timeTaken ms"
