# 获取当前 UTC 时间戳（毫秒）
$start_time = [datetime]::UtcNow
$startTimestamp = [long]($start_time - [datetime]"1970-01-01T00:00:00").TotalMilliseconds

# Start-Process 是用于启动一个新的进程的 PowerShell cmdlet。
# "cmd.exe" 是想要启动的程序，即命令行解释器。
# -ArgumentList "/c npm start": 使用 -ArgumentList 参数传递命令行参数到 cmd.exe。其中 /c 告诉 cmd.exe 执行完指定的命令后关闭命令行窗口。npm start 是启动 Node.js 项目的常用命令。
Start-Process "cmd.exe" -ArgumentList "/c npm start"

# 等待文件写入完成，你可能需要根据实际情况调整等待时间
Start-Sleep -Seconds 10

# Get-Content 是 PowerShell 中用来读取文件内容的命令。命令默认会读取文件中的所有文本内容，并将其作为字符串返回。
# -Path "endTime.txt" 指定了文件的路径。
# [long] 是类型转换操作符，用来将数据转换成整数（int）类型。
$endTime = [long](Get-Content -Path "endTime.txt")

# 将 PowerShell DateTime 转换为时间戳（毫秒）
$startTimestamp = [long](([datetime]$start_time).Subtract([datetime]"1970-01-01T00:00:00").TotalMilliseconds)

# 计算时间差
$timeTaken = $endTime - $startTimestamp

# 显示时间开销
Write-Output "Time taken from start to window show: $timeTaken ms"
